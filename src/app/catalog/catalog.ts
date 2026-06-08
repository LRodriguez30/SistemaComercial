import { AfterViewInit, Component, computed, CUSTOM_ELEMENTS_SCHEMA, signal } from "@angular/core";

@Component({
    selector: 'app-catalog',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './catalog.html'
})
export class Catalog implements AfterViewInit {
    ngOnInit(): void {
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

    products = [
        {
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/5.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/8.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/9.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/Pasos 1.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/Pasos 2.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/Pasos 3.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/Pasos 4.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/Pasos 5.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/Pasos 6.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/Pasos 7.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/Pasos 8.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/Pasos 9.png",
            tags: ["Comodidad", "Originalidad"]
        },
        {
            name: "Pasos",
            description: "Estilo minimalista y suave al caminar, ideal para uso diario dentro y fuera de casa.",
            price: 220,
            image: "Catalogo/Pasos 10.png",
            tags: ["Comodidad", "Originalidad"]
        },
    ];

    readonly state = signal<'closed' | 'open' | 'closing'>('closed');
    readonly selectedProduct = signal<any>(null);

    readonly isOpen = computed(() => this.state() !== 'closed');
    readonly isClosing = computed(() => this.state() === 'closing');

    sizes: string[] = ["36", "37", "38", "39", "40", "41"];

    selectedSize = signal<string | null>(null);

    selectSize(size: string) {
        this.selectedSize.set(size);
    }

    selectProduct(product: any) {
        this.selectedProduct.set(product);
        this.selectedSize.set(null);
        this.lockScroll();
        this.state.set('open');
    }

    closeDetail() {
        this.state.set('closing');

        setTimeout(() => {
            this.state.set('closed');
            this.unlockScroll();
            this.selectedProduct.set(null);
        }, 200);
    }

    lockScroll() {
        document.documentElement.style.overflow = 'hidden';
    }

    unlockScroll() {
        document.documentElement.style.overflow = '';
    }
}