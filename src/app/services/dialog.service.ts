import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from './utils.service';
import { lastValueFrom } from 'rxjs';
import { InfoMessageComponent } from '../lib/components/info-message/info-message.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(
    private readonly utilsService: UtilsService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) {
  }

  public async confirm(message?: string) {
    const dialogRef = this.utilsService.openConfirmDialog(message);
    const result = await lastValueFrom(dialogRef.afterClosed());
    return result;
  }

  public infoMessage(message: string, icon?: string) {
    if (!icon)
      icon = "info.svg";
    const dialogRef =
      this.dialog.open(InfoMessageComponent, {
        data: {
          message: message,
          icon: icon
        },
        panelClass: ['theme-dialog'],
        autoFocus: false,
        disableClose: true,
        maxWidth: 400,
        minWidth: 400
      });
    return dialogRef;
  }
}
