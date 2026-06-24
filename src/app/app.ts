import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, signal, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SistemaComercial');

  isMenuOpen = signal(false);

  showDevelopers = signal(false);

  @ViewChild('developersSection')
  developersSection!: ElementRef<HTMLElement>;

  toggleDevelopers(): void {
    this.showDevelopers.update(value => !value);

    if (this.showDevelopers()) {
      setTimeout(() => {
        this.developersSection.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 150);
    }
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
