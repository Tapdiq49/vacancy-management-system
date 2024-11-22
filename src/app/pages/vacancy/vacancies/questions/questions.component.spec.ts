import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsComponent } from './questions.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from '../../../../services/dialog.service';
import createSpyObj = jasmine.createSpyObj;
import spyObj = jasmine.SpyObj;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;
  let mockDialogRef: spyObj<MatDialogRef<QuestionsComponent>>;
  let mockDialogService: spyObj<DialogService>;

  const mockData = {
    items: {
      interviewQuestions: [
        { id: 1, question: 'Question 1', options: [{ id: 1, isCorrect: true }] },
        { id: 2, question: 'Question 2', options: [{ id: 2, isCorrect: true }] },
      ],
      count: 2,
      fullname: 'Test User',
      title: 'Job Title',
      description: 'Job Description',
      email: 'test@example.com',
      phone: '123456789',
    },
  };

  beforeEach(async () => {
    mockDialogRef = createSpyObj('MatDialogRef', ['close']);
    mockDialogService = createSpyObj('DialogService', ['infoMessage']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatInputModule,
        MatButtonModule,
      ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: DialogService, useValue: mockDialogService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form groups for each question', () => {
    // Act:
    const formGroups = component.formGroups;

    // Assert
    expect(formGroups.length).toBe(mockData.items.interviewQuestions.length);
    formGroups.forEach((formGroup) => {
      expect(formGroup.get('selectedOption')).toBeTruthy();
      expect(formGroup.get('selectedOption')?.validator).toBeDefined();
    });
  });

  it('should start a timer on initialization', () => {
    // Arrange
    jasmine.clock().install();
    component.startTimer();

    // Act
    jasmine.clock().tick(61000);

    // Assert
    expect(mockDialogRef.close).toHaveBeenCalled();
    expect(mockDialogService.infoMessage).toHaveBeenCalledWith('Sual üçün verilən vaxt bitmişdir');
    jasmine.clock().uninstall();
  });

  it('should correctly update answers and progress on step change', () => {
    // Arrange
    const stepChangeEvent = { selectedIndex: 1 };
    component.formGroups[0].get('selectedOption')?.setValue(1);

    // Act
    component.onStepChange(stepChangeEvent);

    // Assert
    expect(component.correctAnswersCount).toBe(1);
    expect(component.percentCorrect).toBe(50);
  });

  it('should validate and accept a valid file', async () => {
    // Arrange
    const validFile = new File(['content'], 'file.pdf', { type: 'application/pdf' });
    const event = { target: { files: [validFile] } };

    spyOn(component, 'convertFileToBase64').and.returnValue(Promise.resolve('base64content'));

    // Act
    component.onFileSelected(event);

    // Assert
    expect(component.fileName).toBe('file.pdf');
    expect(component.fileUploaded).toBeTrue();
    expect(component.fileDisabled).toBeTrue();
    expect(component.convertFileToBase64).toHaveBeenCalledWith(validFile);
  });

  it('should reject an invalid file', () => {
    // Arrange
    const invalidFile = new File(['content'], 'file.txt', { type: 'text/plain' });
    const event = { target: { files: [invalidFile] } };

    // Act
    component.onFileSelected(event);

    // Assert
    expect(component.fileName).toBe('');
    expect(component.fileUploaded).toBeFalse();
    expect(mockDialogService.infoMessage).toHaveBeenCalledWith(
      'Yalnız PDF və DOC formatları qəbul edilir və fayl ölçüsü 5MB-dan çox olmamalıdır.'
    );
  });

});
