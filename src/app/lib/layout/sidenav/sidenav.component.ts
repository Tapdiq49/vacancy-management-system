import { Component, Input } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { MenuService } from '../../../services/menu.service';
import { DialogService } from '../../../services/dialog.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VerticalMenuComponent } from '../../components/vertical-menu/vertical-menu.component';
import { ParentMenuItem } from '../../interfaces/parentMenu';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    VerticalMenuComponent
  ]
})
export class SidenavComponent {
  @Input("sidenavSmall") sidenavSmall: boolean = false;
  menuItems: ParentMenuItem[] = [];

  constructor(
    public configService: ConfigService,
    public menuService: MenuService,
    public dialogService: DialogService,
    public router: Router
  ) { }
  ngOnInit(): void {
    this.menuItems = this.menuService.getVerticalMenuItems();
  }

  ngAfterViewInit() {
    this.menuService.expandActiveSubMenu(this.menuService.getVerticalMenuItems());
  }

  goToHome(){
    this.router.navigate(['/'])
  }
}
