import { TestBed } from '@angular/core/testing';
import { MenuService } from './menu.service';
import { Location } from '@angular/common';
import { BaseService } from './base-service.service';
import { verticalMenuItems } from '../lib/components/vertical-menu/menu';

class MockLocation {
  path() {
    return '/test-path';
  }
}

describe('MenuService', () => {
  let service: MenuService;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MenuService,
        { provide: Location, useClass: MockLocation },
        BaseService,
      ]
    });

    service = TestBed.inject(MenuService);
    location = TestBed.inject(Location);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getVerticalMenuItems', () => {
    it('should return vertical menu items', () => {
      const result = service.getVerticalMenuItems();
      expect(result).toEqual(verticalMenuItems);
    });
  });


  describe('toggleMenuItem', () => {
    it('should toggle menu item visibility', () => {
      const menuId = 1;
      const menuItemMock = document.createElement('div');
      const subMenuMock = document.createElement('div');
      menuItemMock.id = `menu-item-${menuId}`;
      subMenuMock.id = `sub-menu-${menuId}`;
      document.body.appendChild(menuItemMock);
      document.body.appendChild(subMenuMock);

      subMenuMock.classList.remove('show');
      menuItemMock.classList.remove('expanded');

      service.toggleMenuItem(menuId);

      expect(subMenuMock.classList.contains('show')).toBeTrue();
      expect(menuItemMock.classList.contains('expanded')).toBeTrue();

      document.body.removeChild(menuItemMock);
      document.body.removeChild(subMenuMock);
    });
  });

});
