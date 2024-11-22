import { Injectable } from '@angular/core';
export class AppConfig {
  constructor(
    public name: string,
    public theme: any,
    public sidenavSmall: boolean,
    public defaultLanguage: string,
    public contentFullscreen: boolean,
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public appConfig = new AppConfig(
    'VacancyManagement',
    'teal',
    false,
    'az-AZ',
    false
  )
  constructor() { }
}
