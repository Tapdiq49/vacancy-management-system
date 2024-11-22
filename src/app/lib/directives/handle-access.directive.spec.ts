import { HandleAccessDirective } from './handle-access.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef } from '@angular/core';

@Component({
  template: `<button handleAccess [accessRight]="accessRights" [isHide]="isHide">Test Button</button>`
})
class TestComponent {
  accessRights = [];
  isHide = false;
}

describe('HandleAccessDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directive: HandleAccessDirective;
  let button: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HandleAccessDirective]
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    directive = new HandleAccessDirective(new ElementRef(button));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should not modify the element if the user has access rights', () => {
    // Arrange
    localStorage.setItem('user_rights', JSON.stringify(['admin']));
    directive.accessRight = ['admin'];
    directive.isHide = false;

    // Act
    directive.ngOnInit();

    // Assert
    expect(button.disabled).toBe(false);
    expect(button.classList).not.toContain('access-disabled');
  });

  it('should not modify the element if no access rights are provided', () => {
    // Arrange
    localStorage.setItem('user_rights', JSON.stringify(['admin']));
    directive.accessRight = [];
    directive.isHide = false;

    // Act
    directive.ngOnInit();

    // Assert
    expect(button.disabled).toBe(false);
    expect(button.classList).not.toContain('access-disabled');
  });
});
