import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundComponent } from './not-found.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule
      ],
    }).compileComponents();

    // Arrange
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;

    // Act
    fixture.detectChanges();
  });

  it('should create the component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should display 404 error message', () => {
    // Arrange
    const compiled = fixture.nativeElement as HTMLElement;

    // Act
    const h1Text = compiled.querySelector('h1')?.textContent;
    const pText = compiled.querySelector('p')?.textContent;

    // Assert
    expect(h1Text).toContain('404');
    expect(pText).toContain('Səhifə tapılmadı');
  });

  it('should have a link to go back to the home page', () => {
    // Arrange
    const compiled = fixture.nativeElement as HTMLElement;

    // Act
    const button = compiled.querySelector('a[mat-raised-button]');
    const routerLink = button?.getAttribute('routerLink');
    const buttonText = button?.textContent;

    // Assert
    expect(button).toBeTruthy();
    expect(routerLink).toBe(null);
    expect(buttonText).toContain('Ana səhifəyə geri qayıt');
  });
});
