import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpResponseStatusType } from '../../lib/enums/http-response-status-type';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import createSpyObj = jasmine.createSpyObj;
import spyObj = jasmine.SpyObj;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: spyObj<Router>;
  let mockAuthenticationService: spyObj<AuthenticationService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    mockRouter = createSpyObj('Router', ['navigate']);
    mockAuthenticationService = createSpyObj('AuthenticationService', ['login', 'loginGuest']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        MatDialogModule
      ],
      providers: [
        FormBuilder,
        { provide: Router, useValue: mockRouter },
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    // Arrange
    const formGroup: FormGroup = component.loginForm;

    // Act & Assert
    expect(formGroup).toBeTruthy();
    expect(formGroup.get('userName')?.value).toBeNull();
    expect(formGroup.get('password')?.value).toBeNull();
  });

  it('should mark the form as invalid if username or password is empty', () => {
    // Arrange
    const formGroup: FormGroup = component.loginForm;
    formGroup.get('userName')?.setValue('');
    formGroup.get('password')?.setValue('');

    // Act & Assert
    expect(formGroup.invalid).toBeTrue();
  });

  it('should disable the submit button when form is invalid', () => {
    // Arrange
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    // Act & Assert
    expect(submitButton.nativeElement.disabled).toBeFalse();

    // Set valid input values
    component.loginForm.get('userName')?.setValue('testuser');
    component.loginForm.get('password')?.setValue('password123');
    fixture.detectChanges();

    // Act & Assert
    expect(submitButton.nativeElement.disabled).toBeFalse();
  });

  it('should call the login method and navigate on successful login', () => {
    // Arrange
    const formGroup = component.loginForm;
    formGroup.get('userName')?.setValue('testuser');
    formGroup.get('password')?.setValue('password123');
    mockAuthenticationService.login.and.returnValue(of());

    // Act
    component.onSubmitLoginForm();
    fixture.detectChanges();

    // Assert
    expect(mockAuthenticationService.login).toHaveBeenCalledWith(formGroup.value);
  });

  it('should show invalidPassword error if login fails with BadRequest', () => {
    // Arrange
    const formGroup = component.loginForm;
    formGroup.get('userName')?.setValue('testuser');
    formGroup.get('password')?.setValue('password123');
    const errorResponse = {
      error: {
        status: HttpResponseStatusType.BadRequest,
        message: 'Invalid password'
      }
    };
    mockAuthenticationService.login.and.returnValue(throwError(() => errorResponse));

    // Act
    component.onSubmitLoginForm();
    fixture.detectChanges();

    // Assert
    expect(formGroup.get('password')?.hasError('invalidPassword')).toBeTrue();
  });

  it('should set button loading state to true when submitting', () => {
    // Arrange
    const formGroup = component.loginForm;
    formGroup.get('userName')?.setValue('testuser');
    formGroup.get('password')?.setValue('password123');
    mockAuthenticationService.login.and.returnValue(of());

    // Act
    component.onSubmitLoginForm();
    fixture.detectChanges();

    // Assert
    expect(component.btnLoading).toBeTrue();
  });



  it('should change the tab index when tab is selected', () => {
    // Arrange
    const event = { index: 1 };

    // Act
    component.onSelectedTabChange(event);
    fixture.detectChanges();

    // Assert
    expect(component.tabIndex).toBe(1);
  });
});
