import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Constants } from '../constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard {
  constructor(
    private readonly cookieService: CookieService,
    private readonly router: Router
  ) { }

  async canActivate() {
    let token: string = this.cookieService.get(Constants.STORAGE_TOKEN);
    return token ? this.router.parseUrl('/') : true;
  }

}
