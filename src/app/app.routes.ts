import { Routes } from '@angular/router';
import { Confirm } from './auth/confirm/confirm';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Products } from './products/products';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: Register },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'products', component: Products },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'confirm', component: Confirm },
  { path: '', redirectTo: '/confirm', pathMatch: 'full' },
];
