import { CommonModule, NgOptimizedImage } from "@angular/common";
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostListener, Injectable, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit {
  constructor(private el: ElementRef) {}

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

  scrollTo(id: string): void {

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

  }

  @HostListener('window:scroll')
  onScroll() {

    const scrolled = window.scrollY;

    document
      .querySelectorAll('.parallax')
      .forEach((el: any) => {

        el.style.transform =
          `translateY(${scrolled * 0.05}px)`;

      });

  }

  branches = [
    {
      name: "Mercado Oriental",
      description: "Managua — Stock disponible y punto principal de distribución.",
      tags: ["Principal", "Disponible"],
      lat: 12.147928,
      lng: -86.256003
    },
    // {
    //   name: "Mercado Roberto Huembes",
    //   description: "Managua — Buena disponibilidad de productos, ideal para compras rápidas.",
    //   tags: ["Intermedio", "En Demanda"],
    //   lat: 12.1241,
    //   lng: -86.2418
    // },
    // {
    //   name: "Mercado Iván Montenegro",
    //   description: "Managua — Punto con stock variable, depende del día.",
    //   tags: ["Secundario", "En Poca Demanda"],
    //   lat: 12.1299,
    //   lng: -86.2173
    // }
  ];

  products = [
    {
      name: "Pasos Clásicas",
      description: "Diseño cómodo para uso diario en casa o exteriores.",
      price: 250,
      image: "Chanclas Clásicas Pasos.png",
      tags: ["Comodidad", "Uso diario"]
    },
    {
      name: "Pasos Urbanas",
      description: "Modelo sólido y cómodo ideal para protección del pie.",
      price: 280,
      image: "Slides Cerradas Pasos.png",
      tags: ["Ligera", "Ergonómica"]
    },
    {
      name: "Pasos Air",
      description: "Diseño versátil y cómodo para lugares calurosos.",
      price: 300,
      image: "Slides Abiertas Pasos.png",
      tags: ["Resistente", "Familiar"]
    }
  ];
}