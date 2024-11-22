import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MenuService } from '../../../services/menu.service';
import { DialogService } from '../../../services/dialog.service';
import { ApiService } from '../../../services/api.service';
import { TableOptions } from '../../interfaces/table-options';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HandleAccessDirective } from '../../directives/handle-access.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { ColumnChooserComponent } from '../column-chooser/column-chooser.component';
import { PaginationModule } from '../pagination/pagination.module';
import { Apply } from '../../interfaces/apply';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSortModule,
    MatButtonModule,
    HandleAccessDirective,
    MatTooltipModule,
    MatProgressSpinnerModule,
    PaginationModule,
    MatRadioModule,
  ]
})
export class TableComponent {
  @Input() options: TableOptions = {
    path: '',
    dialogComponent: '',
  };
  @Input() extraIcons: any;
  @Input() transactions: any;
  public page: number = 1;
  public perPage: number = 10;
  public paginationList: any[];
  public loading: boolean = false;
  public localPerPage: string;
  public date = new Date().toISOString();
  constructor(
    public apiService: ApiService,
    public menuService: MenuService,
    public dialogService: DialogService,
    public dialog: MatDialog,
    public fb: FormBuilder
  ) {
    this.localPerPage = localStorage.getItem('pageSizeOption');
   }

  get showRankingBtn() {
    return this.options.showRankingBtn ?? false;
  }

  get showRowN() {
    return this.options.showRowN ?? true;
  }

  get showApplyButton() {
    return this.options.showApplyButton ?? true;
  }

  get showDownladPdfOrDoc() {
    return this.options.showDownladPdfOrDoc ?? false;
  }

  async ngOnInit() {
    if(this.localPerPage) this.perPage = parseInt(this.localPerPage);
    this.getPaginationList();
    await this.getTable();
    this.getVisibleColumns();
    if (!this.options.pagination) { this.perPage = 100; }
  }

  ngOnDestroy() {
    this.apiService.list$.next(null);
  }

  public async getTable() {
    this.loading = true;
    this.apiService.resetList();
    if (this.options.pagination) {
      await this.apiService.getTableByParams(this.options.path);
    }
    this.loading = false;
  }

  downloadPdfOrDoc(item: Apply): void {
    const fileBase64: string = item.fileBase64;
    const fileType: string = this.getFileType(fileBase64);

    if (fileType === 'pdf') {
      this.openPdfInNewTab(fileBase64);
    } else if (fileType === 'doc' || fileType === 'docx') {
      this.downloadDoc(fileBase64, item.fileName, fileType);
    }
  }

  getFileType(base64: string): string {
    if (base64.startsWith('data:application/pdf')) {
      return 'pdf';
    } else if (base64.startsWith('data:application/msword') || base64.startsWith('data:application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      return 'docx';
    }
    return '';
  }

  openPdfInNewTab(base64: string): void {
    const pdfBlob = this.base64ToBlob(base64, 'application/pdf');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  }

  downloadDoc(base64: string, fileName: string, fileType: string): void {
    const docBlob = this.base64ToBlob(base64, fileType === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'application/msword');

    const downloadLink = document.createElement('a');
    const docUrl = URL.createObjectURL(docBlob);
    downloadLink.href = docUrl;
    downloadLink.download = fileName || 'file.' + (fileType === 'docx' ? 'docx' : 'doc');

    downloadLink.click();
  }

  base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const byteArray = new ArrayBuffer(1024);
      const byteArrayView = new Uint8Array(byteArray);
      for (let i = 0; i < byteArrayView.length; i++) {
        byteArrayView[i] = byteCharacters.charCodeAt(offset + i);
      }
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }


  getPaginationList() {
    this.paginationList = this.apiService.getPaginationList();
    if (!this.paginationList.some(item => item.displayText === this.localPerPage)) {
      this.perPage = this.paginationList[0].value;
    }
  }

  public onPageChanged(page: number) {
    this.page = page;
    this.getTable();
  }

  public pageSizeOptionChanged(pageSizeOption: number) {
    this.page = 1;
    this.perPage = pageSizeOption;
    this.getTable();
  }

  public getVisibleColumns(): string[] {
    const visibleColumns = localStorage.getItem(this.options.filterColumn);
    return visibleColumns ? JSON.parse(visibleColumns) : null;
  }

  public isColumnHidden(columnName: string): boolean {
    const visibleColumns = this.getVisibleColumns();
    if (!visibleColumns) {
      return false;
    }
    return !visibleColumns.includes(columnName);
  }

  public async ranking() {
    this.dialog.open(ColumnChooserComponent, {
      data: {
        items: this.options
      },
      panelClass: ['theme-dialog'],
      autoFocus: false,
      disableClose: true,
      maxWidth: this.options.columnChooserSize ?? 800,
      minWidth: this.options.columnChooserSize ?? 800
    });
  }

  public async apply(item?: Apply) {
    this.dialog.open(this.options.dialogComponent, {
      data: {
        item: item,
      },
      panelClass: ['theme-dialog'],
      autoFocus: false,
      disableClose: true,
      maxWidth: this.options.dialogSize ?? 700,
      minWidth: this.options.dialogSize ?? 700
    });

  }

}
