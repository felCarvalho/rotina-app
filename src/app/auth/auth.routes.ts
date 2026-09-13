import { Routes } from '@angular/router';
import { LoginFeatureComponent } from './features/login/login.component';
import { LoginComponent } from './login.component';

export const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: '',
        component: LoginFeatureComponent,
      },
    ],
  },
];
