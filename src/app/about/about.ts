import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    standalone: true,
    selector: 'app-home',
    imports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './about.html',
    styleUrl: './about.css'
})
export class About implements AfterViewInit {
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
}