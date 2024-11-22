import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../lib/components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(public dialog: MatDialog) { }

  public openConfirmDialog(message: string) {
    const dialogData: ConfirmDialogModel = new ConfirmDialogModel(message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minWidth: 240,
      maxWidth: 480,
      data: dialogData,
      disableClose: true,
      autoFocus: false
    });
    return dialogRef;
  }
}
