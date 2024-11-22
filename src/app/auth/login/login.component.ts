import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { TextFieldComponent } from '../../lib/components/text-field/text-field.component';
import { HttpResponseStatusType } from '../../lib/enums/http-response-status-type';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    TextFieldComponent,
    MatTabsModule
  ]
})
export class LoginComponent {
  @Input() local: boolean = false;
  loginForm!: FormGroup;
  hide: boolean = true;
  tabIndex: number = 0;
  btnLoading: boolean = false;
  isLoading: boolean = false;
  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
    private readonly fb: FormBuilder,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.defaultForm();
  }

  public defaultForm(){
    this.loginForm = this.fb.group({
      userName: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]]
    })
  }

  public onSubmitLoginForm(): void | boolean {
    if (this.loginForm.invalid) {
      return false;
    }
    this.btnLoading = true;
    this.authenticationService.login(this.loginForm?.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.btnLoading = false;
      },
      error: (err) => {
        if (err.error.status === HttpResponseStatusType.BadRequest ) {
          this.loginForm.controls['password'].setErrors({
            invalidPassword: err.error.message,
          });
        }
        this.btnLoading = false;
      }
    });
  }

  public onSelectedTabChange(event: any) {
    this.tabIndex = event.index;
  }

  public async onGuestLogin() {
    this.btnLoading = true;
    this.authenticationService.loginGuest().subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.btnLoading = false;
      }
    })
  }

}
