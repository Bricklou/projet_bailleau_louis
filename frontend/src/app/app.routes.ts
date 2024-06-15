import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/user/cart/cart.component').then((m) => m.CartComponent),
  },
];
