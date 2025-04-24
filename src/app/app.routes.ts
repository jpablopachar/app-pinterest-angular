import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/Main/Main.component').then((c) => c.MainComponent),
    loadChildren: () => import('./routes/main.route').then((r) => r.MainRoute),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/Auth/Auth.component').then((c) => c.AuthComponent),
  },
];
