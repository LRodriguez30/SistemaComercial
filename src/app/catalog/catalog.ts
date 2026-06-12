import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, computed, CUSTOM_ELEMENTS_SCHEMA, signal } from "@angular/core";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    tags: string[];
}

interface CartItem {
    product: Product;
    size: string;
    quantity: number;
    unitPrice: number;
    discount: number;
}

@Component({
    selector: 'app-catalog',
    imports: [CommonModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './catalog.html'
})
export class Catalog implements AfterViewInit {

    // ==============================
    // STORAGE
    // ==============================

    private readonly CART_STORAGE_KEY = 'pasos_cart';

    // ==============================
    // PRODUCTOS
    // ==============================

    // products = [
    //     {
    //         name: "Pasos Clásicas",
    //         description: "Diseño ligero y cómodo para uso diario, ideal tanto en casa como para salidas rápidas.",
    //         price: 150,
    //         image: "Chanclas Clásicas Pasos.png",
    //         tags: ["Comodidad", "Uso diario"]
    //     },
    //     {
    //         name: "Pasos Urbanas",
    //         description: "Modelo cerrado y estable que brinda mayor protección y soporte en cada paso.",
    //         price: 180,
    //         image: "Slides Cerradas Pasos.png",
    //         tags: ["Protección", "Ergonómica"]
    //     },
    //     {
    //         name: "Pasos Air",
    //         description: "Diseño fresco y versátil, pensado para climas cálidos y uso prolongado sin incomodidad.",
    //         price: 160,
    //         image: "Slides Abiertas Pasos.png",
    //         tags: ["Comodidad", "Frescura"]
    //     },
    //     {
    //         name: "Pasos Urban Flow",
    //         description: "Modelo ligero con ajuste flexible que acompaña el movimiento natural del pie durante todo el día.",
    //         price: 200,
    //         image: "Chinelas Pasos/1.jpeg",
    //         tags: ["Urbano", "Uso diario"]
    //     },
    //     {
    //         name: "Pasos Nova",
    //         description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
    //         price: 220,
    //         image: "Chinelas Pasos/2.jpeg",
    //         tags: ["Ligereza", "Urbano"]
    //     },
    //     {
    //         name: "Pasos Breeze",
    //         description: "Diseñadas para máxima ventilación, ofreciendo frescura constante incluso en los días más calurosos.",
    //         price: 220,
    //         image: "Chinelas Pasos/3.jpeg",
    //         tags: ["Frescura", "Verano"]
    //     },
    //     {
    //         name: "Pasos Titan",
    //         description: "Modelo reforzado con mayor durabilidad y soporte, pensado para uso intensivo y terrenos exigentes.",
    //         price: 250,
    //         image: "Chinelas Pasos/4.jpeg",
    //         tags: ["Resistente", "Exclusivo"]
    //     }
    // ];

    products: Product[] = [
        {
            id: 1,
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/5.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            id: 2,
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/8.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            id: 3,
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/9.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            id: 4,
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/Pasos 1.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            id: 5,
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/Pasos 2.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            id: 6,
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/Pasos 3.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            id: 7,
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/Pasos 4.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            id: 8,
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/Pasos 5.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            id: 9,
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/Pasos 6.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            id: 10,
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/Pasos 7.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            id: 11,
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/Pasos 8.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            id: 12,
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/Pasos 9.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            id: 13,
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/Pasos 10.png",
            tags: ["Comodidad", "Originalidad"]
        }
    ];

    // ==============================
    // TALLAS Y DESCUENTOS
    // ==============================

    sizes: string[] = ["36", "37", "38", "39", "40", "41"];

    readonly sizeDiscounts: Record<string, number> = {
        "36": 12,
        "37": 8,
        "38": 5,
        "39": 0,
        "40": 0,
        "41": 0
    };

    // ==============================
    // SIGNALS
    // ==============================

    readonly state = signal<'closed' | 'open' | 'closing'>('closed');
    readonly selectedProduct = signal<Product | null>(null);
    readonly selectedSize = signal<string | null>(null);

    readonly cart = signal<CartItem[]>([]);
    readonly cartOpen = signal(false);

    // ==============================
    // COMPUTED MODAL
    // ==============================

    readonly isOpen = computed(() => this.state() !== 'closed');
    readonly isClosing = computed(() => this.state() === 'closing');

    // ==============================
    // COMPUTED CARRITO
    // ==============================

    readonly subtotal = computed(() =>
        this.cart().reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0)
    );

    readonly totalDiscount = computed(() =>
        this.cart().reduce((total, item) => {
            return total + item.discount * item.quantity;
        }, 0)
    );

    readonly comision = computed(() =>
        30
    );

    readonly total = computed(() =>
        this.subtotal() - this.totalDiscount() + this.comision()
    );

    readonly cartTotal = computed(() =>
        this.cart().reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0)
    );

    readonly cartCount = computed(() =>
        this.cart().reduce((total, item) => total + item.quantity, 0)
    );

    // ==============================
    // CICLO DE VIDA
    // ==============================

    ngOnInit(): void {
        this.loadCart();

        setTimeout(() => {
            document.querySelectorAll('.reveal').forEach(el => {
                el.classList.add('active');
            });
        }, 50);
    }

    ngAfterViewInit(): void {
        const reveals = document.querySelectorAll('.reveal, .reveal-card');

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add('active');
                });
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -10% 0px"
            }
        );

        reveals.forEach(el => observer.observe(el));
    }

    // ==============================
    // SELECCIÓN DE PRODUCTO Y TALLA
    // ==============================

    selectSize(size: string) {
        this.selectedSize.set(size);
    }

    selectProduct(product: any) {
        this.selectedProduct.set(product);
        this.selectedSize.set(null);
        this.lockScroll();
        this.state.set('open');
    }

    // ==============================
    // MODAL DETALLE
    // ==============================

    closeDetail() {
        this.state.set('closing');

        setTimeout(() => {
            this.state.set('closed');
            this.unlockScroll();
            this.selectedProduct.set(null);
        }, 200);
    }

    // ==============================
    // MODAL CARRITO
    // ==============================

    openCart() {
        this.cartOpen.set(true);

        this.lockScroll();
    }

    closeCart() {
        this.cartOpen.set(false);

        this.unlockScroll();
    }

    // ==============================
    // SCROLL
    // ==============================

    lockScroll() {
        document.documentElement.style.overflow = 'hidden';
    }

    unlockScroll() {
        document.documentElement.style.overflow = '';
    }

    // ==============================
    // LOCAL STORAGE
    // ==============================

    private saveCart() {
        localStorage.setItem(
            this.CART_STORAGE_KEY,
            JSON.stringify(this.cart())
        );
    }

    private loadCart() {
        const savedCart = localStorage.getItem(this.CART_STORAGE_KEY);

        if (!savedCart) return;

        this.cart.set(JSON.parse(savedCart));
    }

    // ==============================
    // PRECIOS Y DESCUENTOS
    // ==============================

    getDiscountBySize(size: string | null): number {
        if (!size) return 0;

        return this.sizeDiscounts[size] ?? 0;
    }

    getPriceBySize(product: Product, size: string | null): number {
        const discount = this.getDiscountBySize(size);

        return product.price - discount;
    }

    // ==============================
    // ACCIONES DEL CARRITO
    // ==============================

    addToCart() {
        const product = this.selectedProduct();
        const size = this.selectedSize();

        if (!product || !size) return;

        const discount = this.getDiscountBySize(size);
        const unitPrice = this.getPriceBySize(product, size);

        const currentCart = this.cart();

        const existingItem = currentCart.find(item =>
            item.product.id === product.id && item.size === size
        );

        if (existingItem) {
            this.cart.set(
                currentCart.map(item =>
                    item.product.id === product.id && item.size === size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            this.cart.set([
                ...currentCart,
                {
                    product,
                    size,
                    quantity: 1,
                    unitPrice,
                    discount
                }
            ]);
        }

        this.closeDetail();

        setTimeout(() => {
            this.openCart();
        }, 200);

        this.saveCart();
    }

    increaseQuantity(index: number) {
        this.cart.set(
            this.cart().map((item, i) =>
                i === index
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );

        this.saveCart();
    }

    decreaseQuantity(index: number) {
        const item = this.cart()[index];

        if (!item) return;

        if (item.quantity <= 1) {
            this.removeFromCart(index);
            return;
        }

        this.cart.set(
            this.cart().map((item, i) =>
                i === index
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );

        this.saveCart();
    }

    removeFromCart(index: number) {
        this.cart.set(
            this.cart().filter((_, i) => i !== index)
        );

        this.saveCart();
    }

    // ==============================
    // SIGNALS PAGO
    // ==============================

    readonly paymentOpen = signal(false);
    readonly showExitWarning = signal(false);

    readonly cardNumber = signal('');
    readonly cardName = signal('');
    readonly cardExpiry = signal('');
    readonly cardCvv = signal('');

    readonly cardFlipped = signal(false);

    // ==============================
    // MODAL PAGO
    // ==============================

    openPayment() {
        this.paymentOpen.set(true);
        this.lockScroll();
    }

    requestClosePayment() {
        const hasData =
            this.cardNumber().trim() ||
            this.cardName().trim() ||
            this.cardExpiry().trim() ||
            this.cardCvv().trim();

        if (hasData) {
            this.showExitWarning.set(true);
            return;
        }

        this.closePayment();
    }

    closePayment() {
        this.paymentOpen.set(false);
        this.showExitWarning.set(false);
        this.clearPaymentForm();
        this.unlockScroll();
    }

    cancelExitWarning() {
        this.showExitWarning.set(false);
    }

    confirmExitPayment() {
        this.closePayment();
    }

    clearPaymentForm() {
        this.cardNumber.set('');
        this.cardName.set('');
        this.cardExpiry.set('');
        this.cardCvv.set('');
        this.cardFlipped.set(false);
    }

    // ==============================
    // TARJETA 3D
    // ==============================

    toggleCardFlip() {
        this.cardFlipped.update(value => !value);
    }

    // ==============================
    // VALIDACIONES DE PAGO
    // ==============================

    isVisaCard(): boolean {
        const cleanNumber = this.cardNumber().replace(/\s/g, '');

        return cleanNumber.startsWith('4');
    }

    isPaymentValid(): boolean {
        const cleanNumber = this.cardNumber().replace(/\s/g, '');
        const nameWords = this.cardName().trim().split(' ').filter(Boolean);
        const expiry = this.cardExpiry();
        const cvv = this.cardCvv();

        return (
            nameWords.length === 2 &&
            cleanNumber.length === 16 &&
            this.isVisaCard() &&
            /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) &&
            /^\d{3}$/.test(cvv)
        );
    }

    // ==============================
    // FORMATO DE CAMPOS
    // ==============================

    formatCardNumber(value: string) {
        const onlyNumbers = value.replace(/\D/g, '').slice(0, 16);

        const formatted = onlyNumbers
            .replace(/(.{4})/g, '$1 ')
            .trim();

        this.cardNumber.set(formatted);
    }

    formatExpiry(value: string) {
        const onlyNumbers = value.replace(/\D/g, '').slice(0, 4);

        if (onlyNumbers.length <= 2) {
            this.cardExpiry.set(onlyNumbers);
            return;
        }

        this.cardExpiry.set(`${onlyNumbers.slice(0, 2)}/${onlyNumbers.slice(2)}`);
    }

    formatCvv(value: string) {
        const onlyNumbers = value.replace(/\D/g, '').slice(0, 3);

        this.cardCvv.set(onlyNumbers);
    }

    formatCardName(value: string) {
        const cleanValue = value
            .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '')
            .replace(/\s{2,}/g, ' ')
            .trimStart();

        const words = cleanValue.split(' ');

        if (words.length > 2) {
            this.cardName.set(`${words[0]} ${words[1]}`);
            return;
        }

        this.cardName.set(cleanValue);
    }

    // ==============================
    // RESTRICCIONES DE TECLADO
    // ==============================

    allowOnlyCardName(event: KeyboardEvent) {
        const input = event.target as HTMLInputElement;
        const value = input.value;

        const allowedKeys = [
            'Backspace',
            'Delete',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'Home',
            'End'
        ];

        if (allowedKeys.includes(event.key)) return;

        const isLetter = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]$/.test(event.key);
        const isSpace = event.key === ' ';

        if (!isLetter && !isSpace) {
            event.preventDefault();
            return;
        }

        if (isSpace) {
            const cursorPosition = input.selectionStart ?? value.length;
            const textBeforeCursor = value.slice(0, cursorPosition);
            const textAfterCursor = value.slice(cursorPosition);

            const alreadyHasSpace = value.includes(' ');
            const isAtStart = cursorPosition === 0;
            const previousCharIsSpace = textBeforeCursor.endsWith(' ');
            const nextCharIsSpace = textAfterCursor.startsWith(' ');
            const hasFirstWord = textBeforeCursor.trim().length > 0;

            if (
                alreadyHasSpace ||
                isAtStart ||
                previousCharIsSpace ||
                nextCharIsSpace ||
                !hasFirstWord
            ) {
                event.preventDefault();
            }
        }
    }

    allowOnlyNumbers(event: KeyboardEvent) {
        const allowedKeys = [
            'Backspace',
            'Delete',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'Home',
            'End'
        ];

        if (allowedKeys.includes(event.key)) return;

        if (!/^\d$/.test(event.key)) {
            event.preventDefault();
        }
    }
}