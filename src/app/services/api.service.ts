import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MockVacancies } from '../fakeJson/mockVacancies';
import { DropDownItem } from '../lib/interfaces/drop-down-item';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public list$ = new BehaviorSubject<any>(null);
  public listCount$ = new BehaviorSubject<number>(0);
  private readonly staticData: Partial<DropDownItem>[] = [
    { value: 10, displayText: '10' },
    { value: 20, displayText: '20' },
    { value: 30, displayText: '30' },
    { value: 40, displayText: '40' },
    { value: 50, displayText: '50' }
  ];

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog) {
  }

  public hasAccess(key: string) {
    let claims: string = localStorage.getItem('user_rights');
    return claims?.includes(key)
  }

  public async getTableByParams(path: string) {
    let res;

    if (path == 'Vacancies') {
      res = MockVacancies.vacancies;
    } else if (path == 'Results') {
      let claims = JSON.parse(localStorage.getItem('quiz-result')) || [];
      if (claims.length > 0) {
        const count: string = claims.length;
        claims = claims.map((claim, index) => ({
          ...claim,
          id: index + 1,
          count: count
        }));
      }
      res = claims;
    }

    this.list$.next(res);
    this.listCount$.next(res.length);
  }

  public getPaginationList() {
    return this.staticData.map(item => ({
      value: item.value,
      displayText: item.displayText
    }));
  }

  public resetList() {
    this.list$.next(null);
    this.listCount$.next(0);
  }

}
