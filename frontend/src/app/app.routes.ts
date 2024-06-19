import { Routes } from '@angular/router';
import { guestGuard } from './guards/guest.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/user/cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'auth',
    canActivate: [guestGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/login/login.component').then(
            (m) => m.LoginComponent,
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/auth/register/register.component').then(
            (m) => m.RegisterComponent,
          ),
      },
    ],
  },
  {
    path: 'user',
    canActivate: [authGuard],
    children: [
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/user/settings/settings.component').then(
            (m) => m.SettingsComponent,
          ),
      },
      {
        path: 'orders',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/user/order-history/order-history.component').then(
                (m) => m.OrderHistoryComponent,
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./pages/user/order-summary/order-summary.component').then(
                (m) => m.OrderSummaryComponent,
              ),
          },
        ],
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/products/products-list/products-list.component').then(
            (m) => m.ProductsListComponent,
          ),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import(
            './pages/products/product-detail/product-detail.component'
          ).then((m) => m.ProductDetailComponent),
      },
    ],
  },

  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];
