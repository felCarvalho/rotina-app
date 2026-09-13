import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent,
      ),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes').then((r) => r.loginRoutes),
  },
  {
    path: 'create-account',
    loadChildren: () =>
      import('./account/account.routes').then((r) => r.accountRoutes),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.routes').then((r) => r.accountRoutes),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes').then((r) => r.homeRoutes),
  },
];
