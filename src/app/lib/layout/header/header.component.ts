import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppConfig, ConfigService } from '../../../services/config.service';
import { DialogService } from '../../../services/dialog.service';
import { MenuService } from '../../../services/menu.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ApiService } from '../../../services/api.service';
import { environment } from '../../../../../environments/environment.prod';
import { HandleAccessDirective } from '../../directives/handle-access.directive';
import { Users } from '../../interfaces/login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    HandleAccessDirective,
    MatTooltipModule
  ]
})
export class HeaderComponent implements OnInit {
  public appConfig: AppConfig;
  public loginUrl: string = 'http://localhost:4200/';
  public showLoginUrl: boolean = false;
  public normalizedFullName: string = "";

  constructor(
    public configService: ConfigService,
    public router: Router,
    public dialogService: DialogService,
    public menuService: MenuService,
    public authenticationService: AuthenticationService,
    public apiService: ApiService
  ) {
    this.appConfig = this.configService.appConfig;
  }

  ngOnInit() {
    const rights: Users = JSON.parse(localStorage.getItem('current_user_info') || '{}');
    this.normalizedFullName = rights.username;
    this.loginUrl = environment.apiUrl;
  }

  public closeSubMenus() {
    this.menuService.closeAllSubMenus();
  }

  public toggleSidenav() {
    this.appConfig.sidenavSmall = !this.appConfig.sidenavSmall;
    if (this.appConfig.sidenavSmall) {
      this.closeSubMenus();
    } else {
      this.menuService.expandActiveSubMenu(this.menuService.getVerticalMenuItems());
    }
  }

  public async logOut() {
    let message: string = "Çıxmaq istədiyinizdən əminsinizmi?";
    let canExit = await this.dialogService.confirm(message);

    if (canExit) {
      this.authenticationService.logout();
      this.router.navigate(['/login'])
    }
  }

  public async signIn(){
    this.authenticationService.logout();
    this.router.navigate(['/login'])
  }
}
