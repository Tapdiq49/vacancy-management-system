import {  ChangeDetectorRef, Component, Input, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { SubscriptionsContainer } from '../../etc/subscriptions-container';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormControl, FormControlName, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  standalone:true,
  imports:[
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxMaskDirective,
  ],
  providers: [
    provideNgxMask()
  ]
})

export class TextFieldComponent implements OnInit {
  @ViewChild(MatInput, { static: true }) matInput: MatInput;
  @Input() label: string;
  @Input() required: boolean;
  @Input() readOnly: boolean;
  @Input() type: string = "text";
  @Input() maskValue: string;
  @Input() maxLength: string;
  @Input() onlyLetters: boolean = false;

  public control: FormControl = new FormControl();
  public onChangeFn = (_: unknown) => { };
  public onTouchedFn = () => { };
  public val = null;
  public subs = new SubscriptionsContainer();

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    private readonly _controlName: FormControlName,
    private readonly cdr: ChangeDetectorRef
  ) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.control = this._controlName.control;

    this.subs.add = this.control?.valueChanges.subscribe(val => {
      if (val)
        this.control.patchValue(val.toString().trimStart(), { emitEvent: false })
    })

    if (this.onlyLetters) {
      this.control.valueChanges.subscribe(val => {
        if (val && !/^[a-zA-ZƏÖÜÇŞĞİıəöüçşğ\s]*$/.test(val)) {
          this.control.setValue(val.replace(/[^a-zA-ZƏÖÜÇŞĞİıəöüçşğ\s]/g, ''), { emitEvent: false });
        }
      });
    }

  }

  ngOnDestroy() {
    this.subs.dispose();
  }

  public writeValue(obj: any): void {
    // this.val = obj;
  }

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.matInput.disabled = isDisabled;
  }

  public onFocus() {
    if (this.maskValue && this.maskValue!='0*') {
      setTimeout(() => {
        this.cdr.detectChanges();
      });
    }
  }

  public onBlur() {
    if (this.shouldTriggerChangeDetection()) {
      setTimeout(() => {
        this.cdr.detectChanges();
      });
    }
  }

  private shouldTriggerChangeDetection(): boolean {
    return this.maskValue && this.maskValue !== '0*';
  }

}
