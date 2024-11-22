import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogButtonsComponent } from './dialog-buttons.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('DialogButtonsComponent', () => {
  let component: DialogButtonsComponent;
  let fixture: ComponentFixture<DialogButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        DialogButtonsComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should set default button labels', () => {
    // Assert
    expect(component.cancelButtonLabel).toBe('İmtina et');
    expect(component.addButtonLabel).toBe('Davam et');
  });

  it('should allow custom button labels', () => {
    // Arrange
    component.cancelButtonLabel = 'Cancel';
    component.addButtonLabel = 'Save';
    fixture.detectChanges();

    // Assert
    expect(component.cancelButtonLabel).toBe('Cancel');
    expect(component.addButtonLabel).toBe('Save');
  });

  it('should emit onCancelBtnClick when cancel button is clicked', () => {
    // Arrange
    spyOn(component.onCancelBtnClick, 'emit');
    const cancelButton = fixture.debugElement.query(By.css('button[type="button"]:first-of-type'));

    // Act
    cancelButton.nativeElement.click();

    // Assert
    expect(cancelButton).toBeTruthy();
    expect(component.onCancelBtnClick.emit).toHaveBeenCalled();
  });

  it('should emit onAddBtnClick when add button is clicked', () => {
    // Arrange
    spyOn(component.onAddBtnClick, 'emit');
    const addButton = fixture.debugElement.query(By.css('button[type="button"]:last-of-type'));

    // Act
    addButton.nativeElement.click();

    // Assert
    expect(addButton).toBeTruthy();
    expect(component.onAddBtnClick.emit).toHaveBeenCalled();
  });

  it('should show loading spinner when btnLoading is true', () => {
    // Arrange
    component.btnLoading = true;
    fixture.detectChanges();

    // Act
    const spinner = fixture.debugElement.query(By.css('mat-spinner'));

    // Assert
    expect(spinner).toBeTruthy();
  });

  it('should show addButtonLabel when btnLoading is false', () => {
    // Arrange
    component.btnLoading = false;
    component.addButtonLabel = 'Save';
    fixture.detectChanges();

    // Act
    const addButtonLabel = fixture.debugElement.query(By.css('button[type="button"]:last-of-type div'));

    // Assert
    expect(addButtonLabel.nativeElement.textContent).toContain('Save');
  });
});
