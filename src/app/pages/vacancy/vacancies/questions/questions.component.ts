import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { DialogService } from '../../../../services/dialog.service';
import { Apply } from '../../../../lib/interfaces/apply';

@Component({
  selector: 'app-questions',
  standalone: true,
  templateUrl: './questions.component.html',
  imports: [
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatRadioButton,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class QuestionsComponent implements OnInit, OnDestroy {
  public formGroups: FormGroup[] = [];
  public isLinear = true;
  public currentStepIndex = 0;
  public lastStepIndex = 0;
  public timer: number = 60;
  public fileName: string = '';
  public fileDisabled: boolean = false;
  public maxFileSize: number = 5 * 1024 * 1024;
  public allowedFileTypes: string[] = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  private timerSubscription: Subscription;
  private timeoutTimer: any;
  public correctAnswersCount: number = 0;
  public percentCorrect: number = 0;
  public fileUploaded: boolean = false;
  public fileBase64: string;
  constructor(
    private dialogRef: MatDialogRef<QuestionsComponent>,
    private fb: FormBuilder,
    public dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.setupForm();
    this.startTimer();
    this.timerSubscription = new Subscription();
    this.lastStepIndex = this.data.items.interviewQuestions.length;
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    if (this.timeoutTimer) {
      clearInterval(this.timeoutTimer);
    }
  }

  public setupForm() {
    this.data.items.interviewQuestions.forEach(() => {
      const formGroup = this.fb.group({
        selectedOption: [null, Validators.required],
      });
      this.formGroups.push(formGroup);
    });
  }

  public startTimer() {
    this.timer = 60;
    this.timeoutTimer = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        this.dialogRef.close();
        this.dialogService.infoMessage('Sual üçün verilən vaxt bitmişdir');
      }
    }, 1000);
  }

  public onStepChange(event: any): void {
    this.currentStepIndex = event.selectedIndex;

    const selectedOptionId = event.selectedIndex - 1;
    const question = this.data.items.interviewQuestions[selectedOptionId];
    const selectedOption = this.formGroups[selectedOptionId]?.get('selectedOption')?.value;

    if (question && question.options) {
      const correctOption = question.options.find(option => option.isCorrect);
      if (correctOption && correctOption.id === selectedOption) {
        this.correctAnswersCount++;
      }
    }

    this.percentCorrect = (this.correctAnswersCount / this.data.items.count) * 100;

    this.resetTimer();

    if (this.currentStepIndex === this.lastStepIndex) {
      clearInterval(this.timeoutTimer);
    }
  }

  public submitAnswers(): void {
    if (!this.fileUploaded) {
      this.dialogService.infoMessage('Zəhmət olmasa fayl yükləyin!')
      return;
    }

    const result: Partial<Apply> = {
      correctAnswers: this.correctAnswersCount,
      percentCorrect: parseFloat(this.percentCorrect.toFixed(2)),
      fileName: this.fileName,
      fileBase64: this.fileBase64,
      fullname: this.data.items.fullname,
      title: this.data.items.title,
      description: this.data.items.description,
      email: this.data.items.email,
      phone: this.data.items.phone,
    };

    const existingResult: string = localStorage.getItem('quiz-result');
    let resultsArray: Partial<Apply>[] = existingResult ? JSON.parse(existingResult) : [];
    resultsArray.push(result);

    localStorage.setItem('quiz-result', JSON.stringify(resultsArray));

    this.dialogRef.close();
    this.dialogService.infoMessage('Hörmətli namizəd müraciətiniz qeydə alındı', 'tick-square.svg');
  }

  public convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  public resetTimer() {
    clearInterval(this.timeoutTimer);
    this.timer = 60;
    this.startTimer();
  }

  public onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      if (this.isValidFile(file)) {
        this.fileName = file.name;
        this.fileUploaded = true;
        this.fileDisabled = true;
        this.convertFileToBase64(file).then((fileBase64) => {
          this.fileBase64 = fileBase64;
        });
      } else {
        this.dialogService.infoMessage('Yalnız PDF və DOC formatları qəbul edilir və fayl ölçüsü 5MB-dan çox olmamalıdır.');
        this.fileName = '';
        event.target.value = '';
        this.fileUploaded = false;
      }
    }
  }

  public isValidFile(file: File): boolean {
    return (
      file.size <= this.maxFileSize &&
      this.allowedFileTypes.includes(file.type)
    );
  }

}
