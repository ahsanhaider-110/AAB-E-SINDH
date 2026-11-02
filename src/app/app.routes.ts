import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'AAB E SINDH | 19L Drinking Water Delivery',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'order',
    title: 'Order a 19L Bottle | AAB E SINDH',
    loadComponent: () => import('./pages/order/order.component').then((m) => m.OrderComponent),
  },
  {
    path: 'delivery-areas',
    title: 'Delivery Areas | AAB E SINDH',
    loadComponent: () => import('./pages/delivery/delivery.component').then((m) => m.DeliveryComponent),
  },
  {
    path: 'water-quality',
    title: 'Water Quality | AAB E SINDH',
    loadComponent: () => import('./pages/quality/quality.component').then((m) => m.QualityComponent),
  },
  {
    path: 'account',
    title: 'Your Orders | AAB E SINDH',
    loadComponent: () => import('./pages/account/account.component').then((m) => m.AccountComponent),
  },
  {
    path: 'admin',
    title: 'Admin Dashboard | AAB E SINDH',
    loadComponent: () => import('./pages/admin/admin.component').then((m) => m.AdminComponent),
  },
  { path: '**', redirectTo: '' },
];
