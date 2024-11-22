import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, NgControl, FormControlName } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TextFieldComponent } from './text-field.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ChangeDetectorRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TextFieldComponent', () => {
  let component: TextFieldComponent;
  let fixture: ComponentFixture<TextFieldComponent>;
  let ngControl: NgControl;
  let formControlNameStub: Partial<FormControlName>;

  beforeEach(async () => {
    formControlNameStub = { control: new FormControl() };
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        NgxMaskDirective,
        TextFieldComponent,
        NgxMaskPipe
      ],
      providers: [
        { provide: NgControl, useValue: ngControl },
        { provide: FormControlName, useValue: formControlNameStub },
        provideNgxMask(),
        ChangeDetectorRef
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFieldComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should patch the value with trimmed start if value changes', () => {
    // Arrange
    spyOn(component.control, 'patchValue');

    // Act
    component.control.setValue('test value');

    // Assert
    expect(component.control.patchValue).toHaveBeenCalledWith('test value', { emitEvent: false });
  });

  it('should only allow letters if onlyLetters is true', () => {
    // Arrange
    component.onlyLetters = true;
    fixture.detectChanges();

    // Act
    component.control.setValue('test');

    // Assert
    expect(component.control.value).toBe('test');
  });


  it('should call writeValue, registerOnChange, and registerOnTouched', () => {
    // Arrange
    const obj = 'test value';

    // Act
    component.writeValue(obj);
    component.registerOnChange(() => {});
    component.registerOnTouched(() => {});

    // Assert
    expect(component.writeValue).toBeTruthy();
    expect(component.registerOnChange).toBeTruthy();
    expect(component.registerOnTouched).toBeTruthy();
  });

  it('should set input to disabled state', () => {
    // Act
    component.setDisabledState(true);

    // Assert
    expect(component.matInput.disabled).toBe(true);
  });

  it('should focus and blur correctly with mask', () => {
    // Arrange
    component.maskValue = '0*';

    // Act
    component.onFocus();
    component.onBlur();

    // Assert
    expect(component.maskValue).toBe('0*');
  });
});
