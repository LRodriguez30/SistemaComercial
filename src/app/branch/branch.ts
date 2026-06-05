import { Component, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

declare let L: any;

@Component({
  selector: 'app-branch',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './branch.html'
})
export class Branch implements AfterViewInit {

  activeBranch: any = null;

  setActiveBranch(branch: any) {
    this.activeBranch = branch;

    if (this.map) {
      this.map.setView([branch.lat, branch.lng], 15);
    }
  }

  private map: any;

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

  ngAfterViewInit(): void {
    setTimeout(() => this.initMap(), 0);

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

  private initMap(): void {

    this.map = L.map('map').setView([12.1364, -86.2514], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    /* ---------------- ICONOS ---------------- */

    const userIcon = L.divIcon({
      className: '',
      html: `
        <div style="
          background:#3b82f6;
          width:14px;
          height:14px;
          border-radius:50%;
          border:3px solid white;
          box-shadow:0 0 10px rgba(59,130,246,0.6);
        "></div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    const storeIcon = L.divIcon({
      className: '',
      html: `
        <div style="
          background:#ef4444;
          width:16px;
          height:16px;
          transform: rotate(45deg);
          border-radius:3px;
          border:2px solid white;
          box-shadow:0 0 10px rgba(239,68,68,0.5);
        "></div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    /* ---------------- BRANCHES ---------------- */

    this.branches.forEach(b => {

      const marker = L.marker([b.lat, b.lng], { icon: storeIcon })
        .addTo(this.map);

      marker.bindPopup(`
        <b>${b.name}</b><br/>
        ${b.description}
        <br/><br/>
        <button style="cursor:pointer;" onclick="window.open('https://www.google.com/maps?q=${b.lat},${b.lng}', '_blank')">
          Abrir en Google Maps
        </button>
      `);
    });

    /* ---------------- USER LOCATION ---------------- */

    this.map.locate({ setView: true, maxZoom: 15 });

    this.map.on('locationfound', (e: any) => {

      L.marker(e.latlng, { icon: userIcon })
        .addTo(this.map)
        .bindPopup('📍 Tu ubicación')
        .openPopup();
    });

    this.map.on('locationerror', () => {
      console.log('No se pudo obtener ubicación');
    });

    /* ---------------- LEGEND ---------------- */

    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = () => {

      const div = L.DomUtil.create('div');

      div.innerHTML = `
        <div style="
          background:white;
          padding:10px 12px;
          border-radius:12px;
          font-size:12px;
          box-shadow:0 5px 20px rgba(0,0,0,0.15);
          line-height:18px;
        ">
          <div>🔵 Tu ubicación</div>
          <div>🔴 Tiendas</div>
        </div>
      `;

      return div;
    };

    legend.addTo(this.map);

    const compass = L.control({ position: 'topright' });

    compass.onAdd = () => {
      const div = L.DomUtil.create('div');

      div.innerHTML = `
    <div id="compass-btn"
      style="
        cursor:pointer;
        width:42px;
        height:42px;
        background:white;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        box-shadow:0 5px 15px rgba(0,0,0,0.2);
        border:1px solid #e5e7eb;
      "
      class="
        transition-all duration-200 ease-out
        active:scale-[0.95]"
      "
      >
      <iconify-icon icon="lucide:compass" style="font-size:20px;"></iconify-icon>
    </div>
  `;

      // IMPORTANTE: evitar que Leaflet capture eventos
      L.DomEvent.disableClickPropagation(div);

      // click handler
      setTimeout(() => {
        const btn = div.querySelector('#compass-btn');

        btn?.addEventListener('click', () => {
          this.map.locate({ setView: true, maxZoom: 15 });

        });
      });

      return div;
    };

    compass.addTo(this.map);
  }

  /* ---------------- UX EXTRA ---------------- */

  focusBranch(branch: any) {
    if (!this.map) return;

    const storeIcon = L.divIcon({
      className: '',
      html: `
      <div style="
        background:#ef4444;
        width:16px;
        height:16px;
        transform: rotate(45deg);
        border-radius:3px;
        border:2px solid white;
        box-shadow:0 0 10px rgba(239,68,68,0.5);
      "></div>
    `,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    this.map.setView([branch.lat, branch.lng], 15);

    const marker = L.marker([branch.lat, branch.lng], { icon: storeIcon })
      .addTo(this.map)
      .bindPopup(`
      <b>${branch.name}</b><br/>
      ${branch.description}
      <br/><br/>
      <button style="cursor:pointer;" onclick="window.open('https://www.google.com/maps?q=${branch.lat},${branch.lng}', '_blank')">
        Abrir en Google Maps
      </button>
    `);

    marker.openPopup();
  }

  openRoute(branch: any) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`;
    window.open(url, '_blank');
  }
}