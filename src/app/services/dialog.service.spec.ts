import { TestBed } from '@angular/core/testing';
import { DialogService } from './dialog.service';
import { UtilsService } from './utils.service';
import { of } from 'rxjs';
import { InfoMessageComponent } from '../lib/components/info-message/info-message.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
class MockUtilsService {
  openConfirmDialog = jasmine.createSpy().and.returnValue(of(true));
}

class MockMatDialog {
  open = jasmine.createSpy().and.returnValue({});
}

describe('DialogService', () => {
  let service: DialogService;
  let utilsService: UtilsService;
  let snackBar: MatSnackBar;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatSnackBarModule],
      providers: [
        DialogService,
        { provide: UtilsService, useClass: MockUtilsService },
        { provide: MatDialog, useClass: MockMatDialog }
      ]
    });
    service = TestBed.inject(DialogService);
    dialog = TestBed.inject(MatDialog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('infoMessage', () => {
    it('should open a dialog with the provided message and icon', () => {
      const message = 'Info message';
      const icon = 'info.svg';
      service.infoMessage(message, icon);

      expect(dialog.open).toHaveBeenCalledWith(InfoMessageComponent, {
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
    });

    it('should use default icon if no icon is provided', () => {
      const message = 'Info message';
      service.infoMessage(message);

      expect(dialog.open).toHaveBeenCalledWith(InfoMessageComponent, {
        data: {
          message: message,
          icon: 'info.svg'
        },
        panelClass: ['theme-dialog'],
        autoFocus: false,
        disableClose: true,
        maxWidth: 400,
        minWidth: 400
      });
    });
  });
});
