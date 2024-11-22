import { Menu } from './../../interfaces/menu.model';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import { MenuService } from '../../../services/menu.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ParentMenuItem } from '../../interfaces/parentMenu';
@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class VerticalMenuComponent implements OnInit {
  @Input('menuItems') menuItems: ParentMenuItem[];
  @Input('menuParentId') menuParentId: number;
  @Input('sidenavSmall') sidenavSmall: boolean = false;
  public parentMenu: Array<ParentMenuItem> = [];

  constructor(
    public configService: ConfigService,
    public menuService: MenuService,
    public authService: AuthenticationService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.parentMenu = this.menuItems.filter((item: Menu) => item.parentId == this.menuParentId);
  }

  public onClick(menu: any) {
    this.menuService.toggleMenuItem(menu.id);
    this.menuService.closeOtherSubMenus(this.menuItems, menu.id);
    this.menuService.selectedMenu(this.menuItems, menu.id);
    this.configService.appConfig.sidenavSmall = false;

    if ((menu.routerLink && !menu.hasSubMenu) || menu.id == 100) {
      this.router.navigate([menu.routerLink]);

      Array.from(document.getElementsByClassName('active-link')).forEach((element: any) => {
        if (!element.classList.contains('parent')) {
          element.classList.remove('active-link');
        }
      });

      const menuItem = document.getElementById('menu-item-' + menu.id);
      if (menuItem) {
        menuItem.classList.add('active-link');
      }
    }
  }

  public hasAccess(menuClaimNames: string[]): boolean {
    const userRights: { roles: string[] } = JSON.parse(localStorage.getItem('user_rights') || '{}');
    const rights: string[] = userRights.roles || [];

    if (menuClaimNames?.length) {
      return rights.some((right: string) => menuClaimNames.includes(right));
    }

    return true;
  }

}
