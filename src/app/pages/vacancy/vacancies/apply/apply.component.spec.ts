import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplyComponent } from './apply.component';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../../../../services/dialog.service';
import { TextFieldComponent } from '../../../../lib/components/text-field/text-field.component';
import { DialogButtonsComponent } from '../../../../lib/components/dialog-buttons/dialog-buttons.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import createSpyObj = jasmine.createSpyObj;
import spyObj = jasmine.SpyObj;

describe('ApplyComponent', () => {
  let component: ApplyComponent;
  let fixture: ComponentFixture<ApplyComponent>;
  let mockDialogRef: spyObj<MatDialogRef<ApplyComponent>>;
  let mockDialogService: spyObj<DialogService>;
  let mockMatDialog: spyObj<MatDialog>;

  beforeEach(async () => {
    mockDialogRef = createSpyObj('MatDialogRef', ['close']);
    mockDialogService = createSpyObj('DialogService', ['infoMessage']);
    mockMatDialog = createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        DialogButtonsComponent,
        TextFieldComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        UntypedFormBuilder,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { item: { id: 1, title: 'Test Vacancy' } } },
        { provide: DialogService, useValue: mockDialogService },
        { provide: MatDialog, useValue: mockMatDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    // Act
    const id = component.form.get('id')?.value;
    const fullname = component.form.get('fullname')?.value;
    const email = component.form.get('email')?.value;
    const phone = component.form.get('phone')?.value;

    // Assert
    expect(id).toBe(1);
    expect(fullname).toBeNull();
    expect(email).toBeNull();
    expect(phone).toBe('+994');
  });

  it('should close the dialog when cancel is called', () => {
    // Act
    component.cancel();

    // Assert
    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });
});
