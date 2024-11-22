import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AppConfig, ConfigService } from './services/config.service';
import { UtilsService } from './services/utils.service';
import { NgClass, CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgClass,
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'vacancy-management';
  appConfig: AppConfig;
  constructor(public configService: ConfigService,
    public router: Router,
    public utilsService: UtilsService) {
    this.appConfig = this.configService.appConfig;
  }

  public localStorageItem(key: string): string | null {
    return localStorage.getItem(key);
  }
}
