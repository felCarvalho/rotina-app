import { Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { CreateAccountComponent } from './features/create-account/create-account.component';

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
