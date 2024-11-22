import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-dialog-buttons',
  standalone: true,
  templateUrl: './dialog-buttons.component.html',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ]
})
export class DialogButtonsComponent {
  @Input() cancelButtonLabel: string = 'İmtina et';
  @Input() addButtonLabel: string = 'Davam et';
  @Input() btnLoading: boolean = false;
  @Output() onCancelBtnClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() onAddBtnClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  public onCancelBtnClicks(event: MouseEvent) {
    this.onCancelBtnClick.emit(event);
  }

  public onAddBtnClicks(event: MouseEvent) {
    this.onAddBtnClick.emit(event);
  }
}
