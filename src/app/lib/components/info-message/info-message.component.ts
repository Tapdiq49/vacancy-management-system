import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class InfoMessageComponent {
  public message: string;
  public icon: string;
  constructor(public dialogRef: MatDialogRef<InfoMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InfoMessageModel) {
    this.message = data.message;
    this.icon = data.icon;
  }

  public onDismiss(): void {
    this.dialogRef.close(true);
  }
}
export class InfoMessageModel {
  constructor(public message: string, public icon: string) { }
}
