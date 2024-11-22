import { Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    title: 'Vacancy Management',
    children: [
      {
        path: '',
        redirectTo: 'vacancies',
        pathMatch: 'full'
      },
      {
        path: 'vacancies',
        loadChildren: () => import('./vacancy/vacancy.routes').then(a => a.routes)
      },
    ]
  }
];
