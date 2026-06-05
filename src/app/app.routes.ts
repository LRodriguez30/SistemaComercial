import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Catalog } from './catalog/catalog';
import { NotFoundComponent } from './not-found/not-found.component';
import { Branch } from './branch/branch';
import { About } from './about/about';

export const routes: Routes = [
    {
        path: '',
        title: "Pasos | Nicaragua camina con Pasos",
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        title: "Pasos | ¡Nicaragua camina con Pasos!",
        component: Home
    },
    {
        path: 'branch',
        title: "Puntos de Venta | Pasos",
        component: Branch
    },
    {
        path: 'catalog',
        title: "Catálogo | Pasos",
        component: Catalog
    },
    {
        path: 'about',
        title: "Acerca de Nosotros | Pasos",
        component: About
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
