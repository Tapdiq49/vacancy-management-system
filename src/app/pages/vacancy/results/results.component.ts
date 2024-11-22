import { Component } from '@angular/core';
import { TableOptions } from '../../../lib/interfaces/table-options';
import { TableComponent } from '../../../lib/components/table/table.component';
@Component({
  selector: 'app-results',
  standalone: true,
  templateUrl: './results.component.html',
  imports: [
    TableComponent
  ],
})
export class ResultsComponent {
  tableOptions: TableOptions = {
    path: 'Results',
    pagination: true,
    showRankingBtn: true,
    showDownladPdfOrDoc: true,
    columns: [
      { type: 'text', label: 'Adı və soyadı', name: 'fullname', width: 160},
      { type: 'text', label: 'Nömrəsi', name: 'phone', width: 160},
      { type: 'text', label: 'Elektron ünvanı', name: 'email'},
      { type: 'text', label: 'Düzgün cavab sayı', name: 'correctAnswers'},
      { type: 'text', label: 'Düzgün cavab faizi', name: 'percentCorrect'},
      { type: 'text', label: 'Başlıq', name: 'title'},
      { type: 'text', label: 'Qısa təsviri', name: 'description' },
    ]
  }
}
