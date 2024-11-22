import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { InfoMessageComponent, InfoMessageModel } from './info-message.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import createSpyObj = jasmine.createSpyObj;

describe('InfoMessageComponent', () => {
  let component: InfoMessageComponent;
  let fixture: ComponentFixture<InfoMessageComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<InfoMessageComponent>>;
  let dialogData: InfoMessageModel;

  beforeEach(async () => {
    dialogData = new InfoMessageModel('Test message', 'info_icon');
    dialogRefSpy = createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        InfoMessageComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: dialogData }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should initialize message and icon from dialog data', () => {
    // Assert
    expect(component.message).toBe(dialogData.message);
    expect(component.icon).toBe(dialogData.icon);
  });

  it('should close the dialog on dismiss', () => {
    // Act
    component.onDismiss();

    // Assert
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });
});
