import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigService } from '../../../services/config.service';
import { MenuService } from '../../../services/menu.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { VerticalMenuComponent } from './vertical-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

describe('VerticalMenuComponent', () => {
  let component: VerticalMenuComponent;
  let fixture: ComponentFixture<VerticalMenuComponent>;
  let configServiceSpy: SpyObj<ConfigService>;
  let menuServiceSpy: SpyObj<MenuService>;
  let authServiceSpy: SpyObj<AuthenticationService>;

  beforeEach(async () => {
    configServiceSpy = createSpyObj('ConfigService', ['appConfig']);
    menuServiceSpy = createSpyObj('MenuService', ['toggleMenuItem', 'closeOtherSubMenus', 'selectedMenu']);
    authServiceSpy = createSpyObj('AuthenticationService', ['']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: ConfigService, useValue: configServiceSpy },
        { provide: MenuService, useValue: menuServiceSpy },
        { provide: AuthenticationService, useValue: authServiceSpy },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalMenuComponent);
    component = fixture.componentInstance;
    component.menuItems = [
      { id: 1, parentId: 0, routerLink: 'home', hasSubMenu: false, title: 'test', claimNames: ['fds', 'fds'], icon: 'home' },
      { id: 2, parentId: 0, routerLink: 'home', hasSubMenu: false, title: 'test', claimNames: ['fds', 'fds'], icon: 'settings' },
    ];
    component.menuParentId = 0;
    component.sidenavSmall = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should filter parentMenu on initialization', () => {
    // Arrange
    const expectedParentMenu = [
      { id: 1, parentId: 0, routerLink: 'home', hasSubMenu: false, title: 'test', claimNames: ['fds', 'fds'], icon: 'home' },
      { id: 2, parentId: 0, routerLink: 'home', hasSubMenu: false, title: 'test', claimNames: ['fds', 'fds'], icon: 'settings' },
    ];;

    // Act
    component.ngOnInit();

    // Assert
    expect(component.parentMenu).toEqual(expectedParentMenu);
  });

  it('should call menuService methods and navigate when onClick is triggered', () => {
    // Arrange
    const menu = { id: 1, routerLink: 'home', hasSubMenu: false };

    // Act
    component.onClick(menu);

    // Assert
    expect(menuServiceSpy.toggleMenuItem).toHaveBeenCalledWith(1);
    expect(menuServiceSpy.closeOtherSubMenus).toHaveBeenCalledWith(component.menuItems, 1);
    expect(menuServiceSpy.selectedMenu).toHaveBeenCalledWith(component.menuItems, 1);
    expect(configServiceSpy.appConfig.sidenavSmall).toBeFalse();
  });

  it('should check if user has access to menu items', () => {
    // Arrange
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(['claim1', 'claim2']));

    // Act
    const hasAccess = component.hasAccess(['claim1']);

    // Assert
    expect(hasAccess).toBeFalse();
  });

  it('should return true when no claim names are provided', () => {
    // Act
    const hasAccess = component.hasAccess([]);

    // Assert
    expect(hasAccess).toBeTrue();
  });
});
