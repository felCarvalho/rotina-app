import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CreateTaskComponent } from './features/create-task/create-task.component';
import { RenameComponent } from './features/rename/rename.component';
import { authGuard } from './auth.guard';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'create-task',
        component: CreateTaskComponent,
      },
      {
        path: 'renomear/:labelId',
        component: RenameComponent,
      },
      {
        path: 'user/account',
        loadComponent: () =>
          import('../account/features/account/account.component').then(
            (m) => m.AccountComponent,
          ),
      },
    ],
  },
];
