import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from '../../../lib/components/table/table.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { HandleAccessDirective } from '../../../lib/directives/handle-access.directive';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ResultsComponent } from './results.component';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TableComponent,
        MatTooltipModule,
        HandleAccessDirective,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should have correct table options', () => {
    // Assert
    expect(component.tableOptions).toBeDefined();
    expect(component.tableOptions.path).toBe('Results');
    expect(component.tableOptions.pagination).toBe(true);
    expect(component.tableOptions.showRankingBtn).toBe(true);
    expect(component.tableOptions.showDownladPdfOrDoc).toBe(true);

    expect(component.tableOptions.columns.length).toBe(7);

    expect(component.tableOptions.columns[0].label).toBe('Adı və soyadı');
    expect(component.tableOptions.columns[0].name).toBe('fullname');
    expect(component.tableOptions.columns[0].width).toBe(160);

    expect(component.tableOptions.columns[1].label).toBe('Nömrəsi');
    expect(component.tableOptions.columns[1].name).toBe('phone');
    expect(component.tableOptions.columns[1].width).toBe(160);

    expect(component.tableOptions.columns[2].label).toBe('Elektron ünvanı');
    expect(component.tableOptions.columns[2].name).toBe('email');

    expect(component.tableOptions.columns[3].label).toBe('Düzgün cavab sayı');
    expect(component.tableOptions.columns[3].name).toBe('correctAnswers');

    expect(component.tableOptions.columns[4].label).toBe('Düzgün cavab faizi');
    expect(component.tableOptions.columns[4].name).toBe('percentCorrect');

    expect(component.tableOptions.columns[5].label).toBe('Başlıq');
    expect(component.tableOptions.columns[5].name).toBe('title');

    expect(component.tableOptions.columns[6].label).toBe('Qısa təsviri');
    expect(component.tableOptions.columns[6].name).toBe('description');
  });
});
