import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { PaginationModule } from './pagination.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownItem } from '../../interfaces/drop-down-item';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let pageChangedSpy: jasmine.Spy;
  let pageSizeOptionChangedSpy: jasmine.Spy;
  let selectDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PaginationModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.pageSizeOption = 10;
    component.totalCount = 100;
    component.paginationList = [
      { displayText: '5', value: 5, select: false },
      { displayText: '10', value: 10, select: false },
      { displayText: '20', value: 20, select: false }
    ] as DropDownItem[];
    pageChangedSpy = spyOn(component.onPageChanged, 'emit');
    pageSizeOptionChangedSpy = spyOn(component.onPageSizeOptionChanged, 'emit');
    fixture.detectChanges();
    selectDebugElement = fixture.debugElement.query(By.css('mat-select'));
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should update pageSizeOption and emit onPageSizeOptionChanged when a new option is selected', () => {
    // Arrange
    component.pageSizeOption = 5;

    // Act
    component.pageSizeOptionChanged();

    // Assert
    expect(pageSizeOptionChangedSpy).toHaveBeenCalledWith(5);
    expect(localStorage.getItem('pageSizeOption')).toBe('5');
  });

  it('should emit onPageChanged when page is changed', () => {
    // Act
    component.pageChanged(2);

    // Assert
    expect(pageChangedSpy).toHaveBeenCalledWith(2);
  });

  it('should display the total count if provided', () => {
    // Arrange
    component.totalCount = 100;

    // Act
    fixture.detectChanges();
    const totalCountElement = fixture.debugElement.query(By.css('.secondary-color')).nativeElement;

    // Assert
    expect(totalCountElement.textContent.trim()).toContain('Cəmi sətir sayı: 100');
  });

  it('should not display the total count if not provided', () => {
    // Arrange
    component.totalCount = null;

    // Act
    fixture.detectChanges();
    const totalCountElement = fixture.debugElement.query(By.css('.secondary-color'));

    // Assert
    expect(totalCountElement).toBeFalsy();
  });
});
