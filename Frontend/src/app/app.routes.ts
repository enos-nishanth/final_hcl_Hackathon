import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.Register)
  },
  {
    path: 'menu',
    loadComponent: () => import('./features/customer/menu/menu').then(m => m.Menu)
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/customer/cart/cart').then(m => m.Cart),
    canActivate: [authGuard]
  },
  {
    path: 'my-orders',
    loadComponent: () => import('./features/customer/my-orders/my-orders').then(m => m.MyOrders),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'Admin' },
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/admin/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'products',
        loadComponent: () => import('./features/admin/product-list/product-list').then(m => m.ProductList)
      },
      {
        path: 'brands',
        loadComponent: () => import('./features/admin/catalog/catalog').then(m => m.Catalog),
        data: { type: 'brands', title: 'Brands' }
      },
      {
        path: 'categories',
        loadComponent: () => import('./features/admin/catalog/catalog').then(m => m.Catalog),
        data: { type: 'categories', title: 'Categories' }
      },
      {
        path: 'packaging',
        loadComponent: () => import('./features/admin/catalog/catalog').then(m => m.Catalog),
        data: { type: 'packagingtypes', title: 'Packaging Types' }
      },
      {
        path: 'inventory',
        loadComponent: () => import('./features/admin/inventory/inventory').then(m => m.Inventory)
      },
      {
        path: 'orders',
        loadComponent: () => import('./features/admin/orders/orders').then(m => m.Orders)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'menu' }
];