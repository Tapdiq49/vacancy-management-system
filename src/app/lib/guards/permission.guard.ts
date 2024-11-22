import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate(): boolean {
    const userRights: { roles: string[] } = JSON.parse(localStorage.getItem('user_rights') || '{}');
    const rightsStr: string[] = userRights.roles || [];

    if (rightsStr.includes('Other_User')) {
      this.router.navigate(['/access-denied']);
      return false;
    }

    return true;
  }
}
