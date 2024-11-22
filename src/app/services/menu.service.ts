import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { BaseService } from './base-service.service';
import { Menu } from '../lib/interfaces/menu.model';
import { verticalMenuItems } from '../lib/components/vertical-menu/menu';

@Injectable({
  providedIn: 'root'
})

export class MenuService extends BaseService {

  public activeParentMenuItem$ = new BehaviorSubject<Menu>(null);
  public activeSubMenuItem$ = new BehaviorSubject<Menu>(null);
  public menuItems$ = new BehaviorSubject<Menu>(null);

  selectedParentMenuItem: Menu;
  public formChanged = new BehaviorSubject<boolean>(false);

  constructor(private readonly location: Location) {
    super();
  }

  public getVerticalMenuItems(): Array<Menu> {
    return verticalMenuItems;
  }

  public expandActiveSubMenu(menu: Array<Menu>) {
    let routerLink = this.location.path();
    let activeMenuItem = menu.find(item => item.routerLink == routerLink);
    if (!activeMenuItem) {
      return;
    }

    let menuItem = activeMenuItem;
    if (menuItem.parentId == 0) {
      this.selectedMenu(menu, menuItem.id);
      this.setPageTitles(activeMenuItem, null);
    } else {
      while (menuItem.parentId != 0) {
        let parentMenuItem: any = menu.find(item => item.id == menuItem.parentId);
        document.getElementById('menu-item-' + parentMenuItem.id)?.classList.add('active-link');
        menuItem = parentMenuItem;
        this.toggleMenuItem(menuItem.id);
        this.selectedMenu(menu, menuItem.id);
      }

      const selectedParentMenuItem = menu.find(item => item.id == activeMenuItem.parentId);
      this.setPageTitles(selectedParentMenuItem, activeMenuItem);
    }
  }

  public toggleMenuItem(menuId: number) {
    let menuItem = document.getElementById('menu-item-' + menuId);
    let subMenu = document.getElementById('sub-menu-' + menuId);
    if (subMenu && menuItem) {
      if (subMenu.classList.contains('show')) {
        subMenu.classList.remove('show');
        menuItem.classList.remove('expanded');
        menuItem.classList.remove('active-link');
      }
      else {
        subMenu.classList.add('show');
        menuItem.classList.add('expanded');
        menuItem.classList.add('active-link');
      }
    }
  }

  public closeOtherSubMenus(menu: Array<Menu>, menuId: number) {
    let currentMenuItem = menu.find(item => item.id == menuId);
    if (currentMenuItem) {
      if (currentMenuItem.parentId == 0) {
        menu.forEach(item => {
          if (item.id != menuId) {
            let subMenu = document.getElementById('sub-menu-' + item.id);
            let menuItem = document.getElementById('menu-item-' + item.id);
            if (subMenu && menuItem) {
              if (subMenu.classList.contains('show')) {
                subMenu.classList.remove('show');
                menuItem.classList.remove('expanded');
                menuItem.classList.remove('active-link');
              }
            }
          }
        });
      }
    }
  }

  public closeAllSubMenus() {
    const menu = document.getElementById("vertical-menu");
    if (menu) {
      const items = Array.from(menu.children[1].children);
      for (const child of items) {
        if (child) {
          const firstChild = child.children[0];
          const secondChild = child.children[1];
          if (firstChild?.classList.contains('expanded')) {
            firstChild.classList.remove('expanded');
            secondChild?.classList.remove('show');
            firstChild.classList.remove('active-link');
          }
        }
      }
    }
  }

  public selectedMenu(menu: Array<Menu>, menuId: number) {
    let selectedMenuItem = menu.find(item => item.id == menuId);
    let selectedSubMenuItem: any;
    let parentMenu: any;
    if (selectedMenuItem?.id == 100) {
      this.selectedParentMenuItem = menu.find(item => item.id == menuId);
    }
    else {
      document.getElementById('menu-item-100')?.classList.remove('active-link');
      if (selectedMenuItem?.parentId != 0) {
        this.selectedParentMenuItem = menu.find(item => item.id == selectedMenuItem?.parentId);
        selectedSubMenuItem = menu.find(item => item.id == menuId);
      }

      if (selectedSubMenuItem) {
        parentMenu = document.getElementById('menu-item-' + this.selectedParentMenuItem.id);
        parentMenu?.classList.add('active-link');
      }
      else {
        parentMenu?.classList.remove('active-link');
      }

    }

    this.setPageTitles(this.selectedParentMenuItem, selectedSubMenuItem);
  }

  private setPageTitles(selectedParentMenuItem: Menu, selectedSubMenuItem: Menu | null) {
    setTimeout(() => {
      if (selectedParentMenuItem)
        this.activeParentMenuItem$.next(selectedParentMenuItem);
      if (selectedSubMenuItem)
        this.activeSubMenuItem$.next(selectedSubMenuItem);
    });
  }
}
