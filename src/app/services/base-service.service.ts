import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public baseUrl: string;
  constructor() {
    this.baseUrl = environment.apiUrl;
  }
}
