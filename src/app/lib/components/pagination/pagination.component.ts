import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropDownItem } from '../../interfaces/drop-down-item';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent{

  @Input() pageSizeOption: number = 10;
  @Input() totalCount: number;
  @Input() paginationList: DropDownItem[];
  @Output() onPageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() onPageSizeOptionChanged: EventEmitter<number> = new EventEmitter<number>();

  public pageChanged(page: number) {
    this.onPageChanged.emit(page)
  }

  public pageSizeOptionChanged() {
    localStorage.setItem('pageSizeOption', this.pageSizeOption.toString());
    this.onPageSizeOptionChanged.emit(this.pageSizeOption);
  }

}
