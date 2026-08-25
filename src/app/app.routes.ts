import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing-page/landing-page.component').then((m) => m.LandingPageComponent),
  },
  {
    path: 'criar-conta',
    loadChildren: () => import('./account/account.routes').then((r) => r.accountRoutes),
  },
  {
    path: 'login',
    loadChildren: () => import('./account/account.routes').then((r) => r.loginRoutes),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes').then((r) => r.homeRoutes),
  },
];
