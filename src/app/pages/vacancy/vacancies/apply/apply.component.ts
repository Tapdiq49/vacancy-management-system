import { QuestionsComponent } from './../questions/questions.component';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../../../../services/dialog.service';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from '../../../../lib/components/text-field/text-field.component';
import { DialogButtonsComponent } from '../../../../lib/components/dialog-buttons/dialog-buttons.component';
import { Apply } from '../../../../lib/interfaces/apply';

@Component({
  selector: 'app-apply',
  standalone: true,
  templateUrl: './apply.component.html',
  imports: [
    CommonModule,
    DialogButtonsComponent,
    TextFieldComponent,
    ReactiveFormsModule
  ],
})
export class ApplyComponent {
  form: UntypedFormGroup;
  btnLoading: boolean = false;
  constructor(
    private readonly dialogRef: MatDialogRef<ApplyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly fb: UntypedFormBuilder,
    public dialog: MatDialog,
    private readonly dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.defaultForm();
  }

  public defaultForm() {
    this.form = this.fb.group({
      id: [this.data.item?.id, Validators.required],
      fullname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: ["+994", [Validators.required, Validators.minLength(17)]]
    });
  }

  public cancel(): void {
    this.dialogRef.close(false);
  }

  public save(): void {
    const form: Apply = this.form.getRawValue();
    const data = this.data.item;
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }

    const savedData: string = localStorage.getItem('apply');
    let storedVacancies = savedData ? JSON.parse(savedData) : [];

    const isDuplicate = storedVacancies.some((item: Apply) =>
      item.id === form.id && item.phone === form.phone
    );

    if (isDuplicate) {
      this.dialogService.infoMessage('Siz artıq bu vakansiyaya müraciət etmisiniz');
      return;
    }

    storedVacancies.push({
      id: form.id,
      fullname: form.fullname,
      phone: form.phone,
      email: form.email,
      title: this.data.item.title
    });

    localStorage.setItem('apply', JSON.stringify(storedVacancies));

    this.dialogRef.close();

    this.dialog.open(QuestionsComponent, {
      data: {
        items: { ...data, ...form}
      },
      panelClass: ['theme-dialog'],
      autoFocus: false,
      disableClose: true,
      maxWidth: 1300,
      minWidth: 1300
    });
  }
}

