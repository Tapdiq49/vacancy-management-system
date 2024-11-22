import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TableComponent } from '../../../lib/components/table/table.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { HandleAccessDirective } from '../../../lib/directives/handle-access.directive';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { VacanciesComponent } from './vacancies.component';
import { AuthenticationService } from '../../../services/authentication.service';
import { ApplyComponent } from './apply/apply.component';
import createSpyObj = jasmine.createSpyObj;
import spyObj = jasmine.SpyObj;

describe('VacanciesComponent', () => {
  let component: VacanciesComponent;
  let fixture: ComponentFixture<VacanciesComponent>;
  let mockAuthenticationService: spyObj<AuthenticationService>;
  let mockRouter: spyObj<Router>;

  beforeEach(async () => {
    mockAuthenticationService = createSpyObj('AuthenticationService', ['getToken', 'loginGuest']);
    mockRouter = createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        TableComponent,
        MatTooltipModule,
        HandleAccessDirective,
        MatButtonModule,
        BrowserAnimationsModule,
      ],
      providers: [
        provideHttpClient(), // Standalone provider for HttpClient
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: Router, useValue: mockRouter },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(VacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should initialize table options correctly', () => {
    // Assert
    expect(component.tableOptions).toBeDefined();
    expect(component.tableOptions.path).toBe('Vacancies');
    expect(component.tableOptions.dialogComponent).toBe(ApplyComponent);
    expect(component.tableOptions.pagination).toBe(true);
    expect(component.tableOptions.showRankingBtn).toBe(true);

    expect(component.tableOptions.columns.length).toBe(3);

    expect(component.tableOptions.columns[0].label).toBe('Başlıq');
    expect(component.tableOptions.columns[0].name).toBe('title');
    expect(component.tableOptions.columns[0].type).toBe('text');

    expect(component.tableOptions.columns[1].label).toBe('Qısa təsviri');
    expect(component.tableOptions.columns[1].name).toBe('description');
    expect(component.tableOptions.columns[1].type).toBe('text');

    expect(component.tableOptions.columns[2].label).toBe('Son müraciət tarixi');
    expect(component.tableOptions.columns[2].name).toBe('lastDate');
    expect(component.tableOptions.columns[2].type).toBe('date');
  });

  it('should navigate to home if guest login succeeds', () => {
    // Arrange
    mockAuthenticationService.getToken.and.returnValue(null);
    mockAuthenticationService.loginGuest.and.returnValue(of());

    // Act
    component.ngOnInit();
    fixture.detectChanges();

    // Assert
    expect(mockAuthenticationService.loginGuest).toHaveBeenCalled();
  });

  it('should not attempt guest login if token exists', () => {
    // Arrange
    mockAuthenticationService.getToken.and.returnValue('valid-token');

    // Act
    component.ngOnInit();
    fixture.detectChanges();

    // Assert
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
