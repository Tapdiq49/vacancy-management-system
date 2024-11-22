import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { Constants } from '../lib/constants';
import { environment } from '../../../environments/environments';
import { LoginRequest, LoginResponse, Users } from '../lib/interfaces/login';
import { User } from '../fakeJson/user';
import { Options } from '../lib/interfaces/options';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private readonly cookieService: CookieService,
  ) { }

  public getToken(): string {
    return this.cookieService.get(`${Constants.STORAGE_TOKEN}`) ?? '';
  }

  public logout() {
    this.cookieService.remove(`${Constants.STORAGE_TOKEN}`, this.setCookiesOptions(true));
    localStorage.removeItem("vacancy_token");
    localStorage.removeItem("user-rights");
  }

  public setCookiesOptions(isLogout: boolean = false) {
    let expiredDate: Date;
    if (isLogout) {
      expiredDate = new Date(0)
    } else {
      expiredDate = new Date();
      expiredDate.setDate(expiredDate.getDate() + 20);
    }

    let options: Options = {
      domain: environment.domain,
      expires: expiredDate,
      path: '/'
    };
    return options;
  }

  public setToken(res: LoginResponse) {
    this.cookieService.put(`${Constants.STORAGE_TOKEN}`, res.accessToken, this.setCookiesOptions());
  }

  public login(data: LoginRequest) {
    if (data.userName.toLowerCase() === User.username.toLowerCase() && data.password === User.password) {
      const fakeResponse: LoginResponse = {
        accessToken: 'fake-token-123456789',
        user: {
          id: User.id,
          username: User.username,
          roles: ['Admin_Get', 'Guest_Get', 'Admin_User']
        }
      };

      return of(fakeResponse).pipe(
        map((res: LoginResponse) => {
          this.setToken(res);
          this.getCurrentUserRights(res.user);
          this.getCurrentUserProfile(res.user);
          return res;
        })
      );
    } else {
      return of(null).pipe(
        map(() => {
          throw {
            error: {
              status: 400,
              message: 'Bele bir istifadəçi mövcud deil'
            }
          };
        })
      );
    }
  }

  public loginGuest() {
    const fakeResponse: LoginResponse = {
      accessToken: 'fake-token-123456',
      user: {
        id: 1,
        username: 'Qonaq istifadəçi',
        roles: ['Guest_Get', 'Vacancies_Put', 'Other_User']
      }
    };
      return of(fakeResponse).pipe(
      map((res: LoginResponse) => {

        this.setToken(res);
        this.getCurrentUserRights(res.user);
        this.getCurrentUserProfile(res.user);
        return res;
      })
    );
  }

  public getCurrentUserRights(user: { roles: string[] }) {
    const fakeResponse = {
      roles: user.roles
    };

    return of(fakeResponse).subscribe(res => {
      localStorage.setItem('user_rights', JSON.stringify(res));
    });
  }

  public getCurrentUserProfile(user: { id: number; username: string }) {
    const fakeResponse: Partial<Users> = {
      id: user.id,
      username: user.username
    };

    return of(fakeResponse).subscribe(res => {
      localStorage.setItem('current_user_info', JSON.stringify(res));
    });
  }
}
