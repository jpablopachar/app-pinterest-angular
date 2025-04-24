import { Routes } from '@angular/router'

export const MainRoute: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../pages/Home/Home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('../pages/CreatePage/CreatePage.component').then(
        (c) => c.CreatePageComponent
      ),
  },
];
