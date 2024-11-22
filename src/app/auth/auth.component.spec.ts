import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterOutlet,
        MatIconModule,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should render the router outlet', () => {
    // Arrange
    const outletElement = fixture.debugElement.query(By.directive(RouterOutlet));

    // Assert
    expect(outletElement).toBeTruthy();
  });

  it('should contain background image in frame-logo', () => {
    // Arrange
    const frameLogoElement = fixture.debugElement.query(By.css('.frame-logo'));

    // Act
    const backgroundImageStyle = frameLogoElement.nativeElement.style.backgroundImage;

    // Assert
    expect(backgroundImageStyle).toContain('url("../../assets/img/background.png")');
  });

  it('should render the subtitle text', () => {
    // Arrange
    const subtitleElement = fixture.debugElement.query(By.css('.subtitle'));

    // Act
    const subtitleText = subtitleElement.nativeElement.textContent;

    // Assert
    expect(subtitleText).toContain('Vakansiya İdarəetmə Proqram Təminatı');
  });

});
