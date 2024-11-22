import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from './utils.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../lib/components/confirm-dialog/confirm-dialog.component';
import { of } from 'rxjs';

describe('UtilsService', () => {
  let service: UtilsService;
  let dialog: MatDialog;

  beforeEach(() => {
    const matDialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(true)
      })
    };

    TestBed.configureTestingModule({
      providers: [
        UtilsService,
        { provide: MatDialog, useValue: matDialogMock }
      ]
    });

    service = TestBed.inject(UtilsService);
    dialog = TestBed.inject(MatDialog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('openConfirmDialog', () => {
    it('should open the confirm dialog with the correct message', () => {
      const message = 'Are you sure?';
      const dialogData = new ConfirmDialogModel(message);

      service.openConfirmDialog(message);

      expect(dialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, {
        minWidth: 240,
        maxWidth: 480,
        data: dialogData,
        disableClose: true,
        autoFocus: false
      });
    });

    it('should return the dialog reference', () => {
      const message = 'Are you sure?';
      const dialogRef = service.openConfirmDialog(message);

      expect(dialogRef.afterClosed).toBeDefined();
    });
  });
});
