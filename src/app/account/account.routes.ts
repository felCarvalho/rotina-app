import { Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { CreateAccountComponent } from './features/create-account/create-account.component';
import { LoginFeatureComponent } from './features/login/login.component';

export const accountRoutes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        component: CreateAccountComponent,
      },
    ],
  },
];

export const loginRoutes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        component: LoginFeatureComponent,
      },
    ],
  },
];
