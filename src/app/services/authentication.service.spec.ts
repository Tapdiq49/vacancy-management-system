import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { CookieService } from 'ngx-cookie';
import { Constants } from '../lib/constants';
import { Options } from '../lib/interfaces/options';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let cookieService: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CookieService', ['get', 'put', 'remove']);

    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: CookieService, useValue: spy }
      ]
    });

    service = TestBed.inject(AuthenticationService);
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getToken', () => {
    it('should return token from cookie', () => {
      cookieService.get.and.returnValue('fake-token-123456789');
      const token = service.getToken();
      expect(token).toBe('fake-token-123456789');
    });

    it('should return an empty string if no token is found', () => {
      cookieService.get.and.returnValue('');
      const token = service.getToken();
      expect(token).toBe('');
    });
  });

  describe('logout', () => {
    it('should remove token from cookie and clear localStorage', () => {
      spyOn(localStorage, 'removeItem');
      cookieService.remove.and.stub();

      service.logout();

      expect(cookieService.remove).toHaveBeenCalledWith(`${Constants.STORAGE_TOKEN}`, jasmine.any(Object));
      expect(localStorage.removeItem).toHaveBeenCalledWith('vacancy_token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('user-rights');
    });
  });

  describe('setCookiesOptions', () => {
    it('should return options with expiration date 20 days from now when not logging out', () => {
      const options: Options = service.setCookiesOptions(false);
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 20);
      expect(options.expires).toEqual(currentDate);
    });

    it('should return options with an expired date when logging out', () => {
      const options: Options = service.setCookiesOptions(true);
      expect(options.expires).toEqual(new Date(0));
    });
  });

  describe('loginGuest', () => {
    it('should return a guest login response and set token', (done) => {
      service.loginGuest().subscribe((response) => {
        expect(response).toBeDefined();
        expect(response.accessToken).toBe('fake-token-123456');
        expect(cookieService.put).toHaveBeenCalled();
        done();
      });
    });
  });


});
