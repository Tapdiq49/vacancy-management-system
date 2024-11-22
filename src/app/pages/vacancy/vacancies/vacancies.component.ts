import { Component, Type } from '@angular/core';
import { TableComponent } from '../../../lib/components/table/table.component';
import { TableOptions } from '../../../lib/interfaces/table-options';
import { ApplyComponent } from './apply/apply.component';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vacancies',
  standalone: true,
  templateUrl: './vacancies.component.html',
  imports: [
    TableComponent
  ],
})
export class VacanciesComponent {
  dioalogComponent: Type<ApplyComponent> = ApplyComponent;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    const token: string = this.authenticationService?.getToken();
    if(!token){
      this.authenticationService?.loginGuest()?.subscribe({
        next: () => {
          this.router.navigate(['/']);
        }
      })
    }
  }

  tableOptions: TableOptions = {
    path: 'Vacancies',
    filterColumn: 'Vacancies',
    dialogComponent: this.dioalogComponent,
    pagination: true,
    showRankingBtn: true,
    columns: [
      { type: 'text', label: 'Vakansiya', name: 'title'},
      { type: 'text', label: 'Qısa təsviri', name: 'description' },
      { type: 'date', label: 'Son müraciət tarixi', name: 'lastDate' },
    ]
  }
}
