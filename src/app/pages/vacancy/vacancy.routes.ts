import { Routes } from '@angular/router';
import { PermissionGuard } from '../../lib/guards/permission.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'vacancies_list', pathMatch: 'full' },
  { path: 'vacancies_list', loadComponent: () => import('./vacancies/vacancies.component').then(c => c.VacanciesComponent), title: 'Vakansiyalar' },
  { path: 'results', loadComponent: () => import('./results/results.component').then(c => c.ResultsComponent), canActivate: [PermissionGuard], title: 'Müraciətlər' },
]
