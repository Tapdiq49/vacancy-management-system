import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environments';
import { BaseService } from './base-service.service';

describe('BaseService', () => {
  let service: BaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseService]
    });

    service = TestBed.inject(BaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the baseUrl to the apiUrl from environment', () => {
    expect(service.baseUrl).toBe(environment.apiUrl);
  });
});
