import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, computed, CUSTOM_ELEMENTS_SCHEMA, signal } from "@angular/core";
import { ProductModel } from "./product/product";

interface Product {
    id: number;
    model: string;
    name: string;
    description: string;
    price: number;
    image: string;
    tags: string[];
    colors: ProductColor[];
}

interface ProductColor {
    name: string;
    hex: string;
    secondaryHex?: string;
    thirdHex?: string;
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

    crocsColors: ProductColor[] = [
        {
            name: "Gris",
            hex: "#9E9E9E"
        },
        {
            name: "Morado",
            hex: "#9B5DE5"
        },
        {
            name: "Rosa",
            hex: "#FF4FA3"
        },
        {
            name: "Negro",
            hex: "#000000"
        },
        {
            name: "Blanco",
            hex: "#FFFFFF"
        },
        {
            name: "Azul",
            hex: "#2563EB"
        },
        {
            name: "Azul Marino",
            hex: "#1E3A8A"
        },
        {
            name: "Celeste",
            hex: "#38BDF8"
        },
        {
            name: "Verde",
            hex: "#22C55E"
        },
        {
            name: "Verde Oscuro",
            hex: "#166534"
        },
        {
            name: "Amarillo",
            hex: "#FACC15"
        },
        {
            name: "Naranja",
            hex: "#F97316"
        },
        {
            name: "Rojo",
            hex: "#DC2626"
        },
        {
            name: "Violeta",
            hex: "#7C3AED"
        },
        {
            name: "Marrón",
            hex: "#8B5A2B"
        },
        {
            name: "Beige",
            hex: "#D6C6A8"
        },
        {
            name: "Crema",
            hex: "#F5F5DC"
        },
        {
            name: "Turquesa",
            hex: "#14B8A6"
        },
        {
            name: "Oliva",
            hex: "#556B2F"
        },
        {
            name: "Coral",
            hex: "#FF7F50"
        }
    ];

    bayabandColors: ProductColor[] = [
        {
            name: "Negro con rayas Blancas",
            hex: "#000000",
            secondaryHex: "#FFFFFF"
        },
        {
            name: "Azul con rayas Blancas y Rojas",
            hex: "#21469B",
            secondaryHex: "#FFFFFF",
            thirdHex: "#E10600"
        }
    ];

    chinelaDeportivaColors: ProductColor[] = [
        {
            name: "Blanco con Negro",
            hex: "#FFFFFF",
            secondaryHex: "#000000"
        },
        {
            name: "Azul con Blanco",
            hex: "#1F5CB8",
            secondaryHex: "#FFFFFF"
        },
        {
            name: "Azul Violeta con Blanco",
            hex: "#6B7DFF",
            secondaryHex: "#FFFFFF"
        },
        {
            name: "Morado con Blanco",
            hex: "#9B59B6",
            secondaryHex: "#FFFFFF"
        },
        {
            name: "Violeta con Blanco",
            hex: "#5A2A7A",
            secondaryHex: "#FFFFFF"
        },
        {
            name: "Verde Oscuro con Blanco",
            hex: "#1F3D27",
            secondaryHex: "#FFFFFF"
        }
    ];

    urbanColors: ProductColor[] = [
        {
            name: "Negro con Azul",
            hex: "#000000",
            secondaryHex: "#26B9FF"
        },
        {
            name: "Negro con Rosado",
            hex: "#000000",
            secondaryHex: "#F7A3C8"
        }
    ];

    classicColors: ProductColor[] = [
        {
            name: "Negro",
            hex: "#000000"
        },
        {
            name: "Blanco",
            hex: "#FFFFFF"
        },
        {
            name: "Azul Marino",
            hex: "#1E3A8A"
        },
        {
            name: "Gris con Negro",
            hex: "#9CA3AF",
            secondaryHex: "#000000"
        },
        {
            name: "Beige con Marrón",
            hex: "#D6C6A8",
            secondaryHex: "#8B5A2B"
        },
        {
            name: "Marrón con Beige",
            hex: "#D6C6A8",
            secondaryHex: "#8B5A2B"
        }
    ];

    sportColors: ProductColor[] = [
        {
            name: "Blanco con Botón Negro",
            hex: "#FFFFFF",
            secondaryHex: "#000000"
        },
        {
            name: "Negro con Botón Blanco",
            hex: "#000000",
            secondaryHex: "#FFFFFF"
        },
        {
            name: "Azul Marino con Botón Blanco",
            hex: "#1E3A8A",
            secondaryHex: "#FFFFFF"
        },
        {
            name: "Gris con Botón Negro",
            hex: "#9CA3AF",
            secondaryHex: "#000000"
        },
        {
            name: "Blanco con Botón Rojo",
            hex: "#FFFFFF",
            secondaryHex: "#DC2626"
        },
        {
            name: "Negro con Botón Rojo",
            hex: "#000000",
            secondaryHex: "#DC2626"
        },
        {
            name: "Blanco con Botón Azul",
            hex: "#FFFFFF",
            secondaryHex: "#2563EB"
        },
        {
            name: "Negro con Botón Azul",
            hex: "#000000",
            secondaryHex: "#2563EB"
        },
        {
            name: "Verde Oscuro con Botón Blanco",
            hex: "#14532D",
            secondaryHex: "#FFFFFF"
        },
        {
            name: "Morado con Botón Blanco",
            hex: "#7E22CE",
            secondaryHex: "#FFFFFF"
        },
        {
            name: "Azul Violeta con Botón Blanco",
            hex: "#6366F1",
            secondaryHex: "#FFFFFF"
        }
    ];

    readonly products = signal<Product[]>([
        new ProductModel(1, "Crocs", {
            name: "Crocs Pasos",
            description: "Pasos estilo Crocs combina ligereza y comodidad para largas jornadas. Recomendado para personal de salud, trabajo, descanso y uso diario.",
            price: 220,
            image: "Catalogo/Modelos/Crocs-Gris.png",
            colors: this.crocsColors
        }),
        new ProductModel(2, "Bayaband", {
            name: "Crocs Bayaband Pasos",
            description: "Pasos estilo Bayaband ofrece una apariencia deportiva y moderna. Ideal para uso diario",
            price: 250,
            image: "Catalogo/Modelos/Bayaband-Azul.png",
            colors: this.bayabandColors
        }),
        new ProductModel(3, "Chinela Deportiva 23", {
            name: "Chinela Deportiva 23 Pasos",
            description: "Pasos deportivas ofrece comodidad y un diseño deportivo para quienes buscan un estilo relajado en su día a día.",
            price: 180,
            image: "Catalogo/Modelos/Chinela Deportiva 23-Blanco con Negro.png",
            colors: this.chinelaDeportivaColors
        }),
        new ProductModel(4, "Urban 23", {
            name: "Chinela Urban 23 Pasos",
            description: "Pasos Urban 23 ofrece un diseño fresco y juvenil, pensado para quienes valoran tanto la comodidad como la personalidad en su calzado.",
            price: 180,
            image: "Catalogo/Modelos/Urban 23-Negro con Rosado.png",
            colors: this.urbanColors
        }),
        new ProductModel(5, "Clásica", {
            name: "Chinelas Clásicas Pasos",
            description: "Pasos mantiene el encanto de las chinelas clásicas, añadiendo detalles y acabados que le dan un aspecto más distintivo y elegante.",
            price: 250,
            image: "Catalogo/Modelos/Clásica-Negro.png",
            colors: this.classicColors
        }),
        new ProductModel(6, "Sport", {
            name: "Zapato Sport Pasos",
            description: "Pasos estilo Sport combina un diseño inspirado en el calzado deportivo con una estructura ligera y ventilada para brindar mayor comodidad durante el día.",
            image: "Catalogo/Modelos/Sport-Blanco con Botón Negro.png",
            colors: this.sportColors
        })
    ]);

    readonly colorCarouselIndex = signal<Record<string, number>>({});

    readonly visibleColorsLimit = 5;

    getVisibleColors(product: Product): ProductColor[] {
        const start = this.colorCarouselIndex()[product.model] ?? 0;

        return product.colors.slice(start, start + this.visibleColorsLimit);
    }

    canMoveColorsLeft(product: Product): boolean {
        const start = this.colorCarouselIndex()[product.model] ?? 0;

        return product.colors.length > this.visibleColorsLimit && start > 0;
    }

    canMoveColorsRight(product: Product): boolean {
        const start = this.colorCarouselIndex()[product.model] ?? 0;

        return product.colors.length > this.visibleColorsLimit &&
            start + this.visibleColorsLimit < product.colors.length;
    }

    moveColorsLeft(product: Product) {
        this.colorCarouselIndex.update(current => {
            const currentIndex = current[product.model] ?? 0;

            return {
                ...current,
                [product.model]: Math.max(currentIndex - 1, 0)
            };
        });
    }

    moveColorsRight(product: Product) {
        this.colorCarouselIndex.update(current => {
            const currentIndex = current[product.model] ?? 0;
            const maxIndex = product.colors.length - this.visibleColorsLimit;

            return {
                ...current,
                [product.model]: Math.min(currentIndex + 1, maxIndex)
            };
        });
    }


    // COLORES SELECCIONADOS EN LOCALSTORAGE
    private readonly SELECTED_COLORS_STORAGE_KEY = 'pasos_selected_colors';
    readonly selectedColors = signal<{ modelId: string; color: ProductColor }[]>([]);

    private loadSelectedColors() {
        const savedColors = localStorage.getItem(this.SELECTED_COLORS_STORAGE_KEY);

        if (savedColors) {
            const parsedColors: { modelId: string; color: ProductColor }[] = JSON.parse(savedColors);

            this.selectedColors.set(parsedColors);

            this.products.update(products =>
                products.map(product => {
                    const selected = parsedColors.find(c => c.modelId === product.model);

                    if (!selected) return product;

                    return {
                        ...product,
                        name: `${product.model} Pasos - ${selected.color.name}`,
                        image: `Catalogo/Modelos/${product.model}-${selected.color.name}.png`
                    };
                })
            );

            return;
        }

        const defaultColors = this.products()
            .filter((product: Product) => product.colors.length > 0)
            .map((product: Product) => ({
                modelId: product.model,
                color: product.colors[0]
            }));

        this.selectedColors.set(defaultColors);

        localStorage.setItem(
            this.SELECTED_COLORS_STORAGE_KEY,
            JSON.stringify(defaultColors)
        );
    }

    selectColor(product: Product, color: ProductColor) {
        const image = `Catalogo/Modelos/${product.model}-${color.name}.png`;

        this.products.update(products =>
            products.map(p =>
                p.model === product.model
                    ? { ...p, name: `${product.model} Pasos - ${color.name}`, image }
                    : p
            )
        );

        this.selectedColors.update(colors => {
            const exists = colors.some(c => c.modelId === product.model);

            const updatedColors = exists
                ? colors.map(c =>
                    c.modelId === product.model
                        ? { modelId: product.model, color }
                        : c
                )
                : [
                    ...colors,
                    { modelId: product.model, color }
                ];

            localStorage.setItem(
                this.SELECTED_COLORS_STORAGE_KEY,
                JSON.stringify(updatedColors)
            );

            return updatedColors;
        });
    }

    getSelectedColor(product: Product): ProductColor {
        const selected = this.selectedColors()
            .find(c => c.modelId === product.model);

        return selected?.color ?? product.colors[0];
    }

    getProductImage(product: Product): string {
        return product.image;
    }

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




    // products: Product[] = [
    //     new ProductModel(1, "Crocs", {
    //         name: "Crocs Pasos",
    //         description: "Pasos estilo Crocs combina ligereza y comodidad para largas jornadas. Recomendado para personal de salud, trabajo, descanso y uso diario.",
    //         price: 220,
    //         image: `Catalogo/Modelos/Crocs-${}.png`,
    //         colors: this.crocsColors
    //     }),
    //     // {
    //     //     id: 0,
    //     //     name: "Pasos",
    //     //     description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
    //     //     price: 220,
    //     //     image: "Catalogo/Pasos Z.png",
    //     //     tags: ["Comodidad", "Originalidad"],
    //     //     colors: this.availableColors
    //     // },
    //     // {
    //     //     id: 1,
    //     //     name: "Pasos",
    //     //     description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
    //     //     price: 220,
    //     //     image: "Catalogo/5.png",
    //     //     tags: ["Comodidad", "Originalidad"],
    //     //     colors: this.availableColors
    //     // },
    //     // {
    //     //     id: 2,
    //     //     name: "Pasos",
    //     //     description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
    //     //     price: 220,
    //     //     image: "Catalogo/8.png",
    //     //     tags: ["Comodidad", "Originalidad"],
    //     //     colors: this.availableColors
    //     // },
    //     // {
    //     //     id: 3,
    //     //     name: "Pasos",
    //     //     description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
    //     //     price: 220,
    //     //     image: "Catalogo/9.png",
    //     //     tags: ["Comodidad", "Originalidad"],
    //     //     colors: this.availableColors
    //     // },
    //     // {
    //     //     id: 4,
    //     //     name: "Pasos",
    //     //     description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
    //     //     price: 220,
    //     //     image: "Catalogo/Pasos 1.png",
    //     //     tags: ["Comodidad", "Originalidad"],
    //     //     colors: this.availableColors
    //     // },
    //     // {
    //     //     id: 5,
    //     //     name: "Pasos",
    //     //     description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
    //     //     price: 220,
    //     //     image: "Catalogo/Pasos 2.png",
    //     //     tags: ["Comodidad", "Originalidad"],
    //     //     colors: this.availableColors
    //     // },
    //     // {
    //     //     id: 6,
    //     //     name: "Pasos",
    //     //     description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
    //     //     price: 220,
    //     //     image: "Catalogo/Pasos 3.png",
    //     //     tags: ["Comodidad", "Originalidad"],
    //     //     colors: this.availableColors
    //     // },
    //     // {
    //     //     id: 7,
    //     //     name: "Pasos",
    //     //     description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
    //     //     price: 220,
    //     //     image: "Catalogo/Pasos 4.png",
    //     //     tags: ["Comodidad", "Originalidad"],
    //     //     colors: this.availableColors
    //     // },
    //     // {
    //     //     id: 8,
    //     //     name: "Pasos",
    //     //     description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
    //     //     price: 220,
    //     //     image: "Catalogo/Pasos 5.png",
    //     //     tags: ["Comodidad", "Originalidad"],
    //     //     colors: this.availableColors
    //     // },
    //     // {
    //     //     id: 9,
    //     //     name: "Pasos",
    //     //     description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
    //     //     price: 220,
    //     //     image: "Catalogo/Pasos 6.png",
    //     //     tags: ["Comodidad", "Originalidad"],
    //     //     colors: this.availableColors
    //     // },
    //     // {
    //     //     id: 10,
    //     //     name: "Pasos",
    //     //     description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
    //     //     price: 220,
    //     //     image: "Catalogo/Pasos 7.png",
    //     //     tags: ["Comodidad", "Originalidad"],
    //     //     colors: this.availableColors
    //     // },
    //     // {
    //     //     id: 11,
    //     //     name: "Pasos",
    //     //     description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
    //     //     price: 220,
    //     //     image: "Catalogo/Pasos 8.png",
    //     //     tags: ["Comodidad", "Originalidad"],
    //     //     colors: this.availableColors
    //     // },
    //     // {
    //     //     id: 12,
    //     //     name: "Pasos",
    //     //     description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
    //     //     price: 220,
    //     //     image: "Catalogo/Pasos 9.png",
    //     //     tags: ["Comodidad", "Originalidad"],
    //     //     colors: this.availableColors
    //     // },
    //     // {
    //     //     id: 13,
    //     //     name: "Pasos",
    //     //     description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
    //     //     price: 220,
    //     //     image: "Catalogo/Pasos 10.png",
    //     //     tags: ["Comodidad", "Originalidad"],
    //     //     colors: this.availableColors
    //     // },
    //     // {
    //     //     id: 14,
    //     //     name: "Pasos",
    //     //     description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
    //     //     price: 220,
    //     //     image: "Catalogo/Pasos 11.png",
    //     //     tags: ["Comodidad", "Originalidad"],
    //     //     colors: this.availableColors
    //     // },
    //     // {
    //     //     id: 15,
    //     //     name: "Pasos",
    //     //     description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
    //     //     price: 220,
    //     //     image: "Catalogo/Pasos 12.png",
    //     //     tags: ["Comodidad", "Originalidad"],
    //     //     colors: this.availableColors
    //     // },
    //     // {
    //     //     id: 16,
    //     //     name: "Pasos",
    //     //     description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
    //     //     price: 220,
    //     //     image: "Catalogo/Pasos 13.png",
    //     //     tags: ["Comodidad", "Originalidad"],
    //     //     colors: this.availableColors
    //     // },
    //     // {
    //     //     id: 17,
    //     //     name: "Pasos",
    //     //     description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
    //     //     price: 220,
    //     //     image: "Catalogo/Pasos 14.png",
    //     //     tags: ["Comodidad", "Originalidad"],
    //     //     colors: this.availableColors
    //     // },
    // ];

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
        this.loadSelectedColors();

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