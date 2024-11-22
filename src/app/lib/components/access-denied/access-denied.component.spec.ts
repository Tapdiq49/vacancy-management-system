import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessDeniedComponent } from './access-denied.component';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import createSpyObj = jasmine.createSpyObj;

describe('AccessDeniedComponent', () => {
  let component: AccessDeniedComponent;
  let fixture: ComponentFixture<AccessDeniedComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatCardModule,
        AccessDeniedComponent
      ],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessDeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should navigate to home when goHome is called', () => {
    // Act
    component.goHome();

    // Assert
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
