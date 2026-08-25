import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
];
