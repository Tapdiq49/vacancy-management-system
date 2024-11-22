import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a valid appConfig object', () => {
    expect(service.appConfig).toBeDefined();
    expect(service.appConfig.name).toBe('VacancyManagement');
    expect(service.appConfig.theme).toBe('teal');
    expect(service.appConfig.sidenavSmall).toBeFalse();
    expect(service.appConfig.defaultLanguage).toBe('az-AZ');
    expect(service.appConfig.contentFullscreen).toBeFalse();
  });

  it('should have the correct default values for appConfig', () => {
    const defaultConfig = service.appConfig;
    expect(defaultConfig.name).toEqual('VacancyManagement');
    expect(defaultConfig.theme).toEqual('teal');
    expect(defaultConfig.sidenavSmall).toEqual(false);
    expect(defaultConfig.defaultLanguage).toEqual('az-AZ');
    expect(defaultConfig.contentFullscreen).toEqual(false);
  });
});
