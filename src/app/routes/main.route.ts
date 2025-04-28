import { Routes } from '@angular/router'
import { idGuard } from '@app/guards/id.guard'

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
        (c) => c.CreatePageComponent,
      ),
  },
  {
    path: 'pin/:id',
    loadComponent: () =>
      import('../pages/PostPage/PostPage.component').then(
        (c) => c.PostPageComponent,
      ),
    canActivate: [idGuard],
  },
]
