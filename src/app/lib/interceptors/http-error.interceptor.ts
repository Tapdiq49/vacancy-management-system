import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../../services/dialog.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { HttpResponseStatusType } from '../enums/http-response-status-type';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    public environment: string;
    constructor(@Inject('environment') environment: string,
      public snackBar: MatSnackBar,
      public dialogService: DialogService,
      public dialogRef: MatDialog,
      private readonly router: Router,
      public apiService: ApiService,
      ) {
      this.environment = environment;
    }

    intercept(req: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<string>> {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            console.error(`[ERROR] ${error.error.message}`);
          } else {
            console.error(`Error Code: ${error.status}\nMessage: ${error.message}`);
            this.handleError(error);
          }

          const preloader = document.getElementById('preloader');
          if (preloader) {
              preloader.classList.add('hide');
          }

          return throwError(() => error);
        })
      );
  }

  async handleError(error) {
    if (error?.error) {
      if(error.status === HttpResponseStatusType.ServerError) {
        this.dialogService.infoMessage("Server xətası");
      }
    } else if (error.status === HttpResponseStatusType.Permission){
      this.router.navigate(['/access-denied']);
    }
  }

}
