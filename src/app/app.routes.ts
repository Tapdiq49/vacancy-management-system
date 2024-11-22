import { Routes } from '@angular/router';
import { AccessDeniedComponent } from './lib/components/access-denied/access-denied.component';
import { inject } from '@angular/core';
import { TokenGuard } from './lib/guards/toke.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pages.routes').then(p => p.routes),
  },
  {
    path: '',
    canActivate: [async () => await inject(TokenGuard).canActivate()],
    loadChildren: () => import('./auth/auth.routes').then(a => a.routes)
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
    title: 'Bu səhifəyə giriş etməyə icazəniz yoxdur'
  },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(c => c.NotFoundComponent), title: 'Səhifə tapılmadı'  }
];
