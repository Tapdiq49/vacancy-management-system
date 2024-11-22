import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from '../lib/layout/header/header.component';
import { SidenavComponent } from '../lib/layout/sidenav/sidenav.component';
import { AppConfig, ConfigService } from '../services/config.service';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    HeaderComponent,
    SidenavComponent
  ],
  templateUrl: './pages.component.html',
})
export class PagesComponent {
  appConfig: AppConfig;
  constructor(
    public configService: ConfigService,
  ) {
    this.appConfig = this.configService.appConfig;
  }

}
