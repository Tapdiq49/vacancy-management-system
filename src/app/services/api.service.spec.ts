import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MockVacancies } from '../fakeJson/mockVacancies';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, MatDialogModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize observables with default values', () => {
    service.list$.subscribe(value => expect(value).toBeNull());
    service.listCount$.subscribe(value => expect(value).toEqual(0));
  });

  describe('getTableByParams', () => {
    it('should set the list$ and listCount$ based on Vacancies', async () => {
      await service.getTableByParams('Vacancies');
      service.list$.subscribe(value => expect(value).toEqual(MockVacancies.vacancies));
      service.listCount$.subscribe(value => expect(value).toEqual(MockVacancies.vacancies.length));
    });

    it('should set the list$ and listCount$ based on Results', async () => {
      const mockQuizResults = [
        { name: 'John Doe', score: 90 },
        { name: 'Jane Smith', score: 80 },
      ];
      localStorage.setItem('quiz-result', JSON.stringify(mockQuizResults));

      await service.getTableByParams('Results');

      service.list$.subscribe(value => {
        expect(value.length).toBe(2);
        expect(value[0].id).toBe(1);
        expect(value[1].id).toBe(2);
      });
      service.listCount$.subscribe(value => expect(value).toEqual(2));
    });
  });

  describe('getPaginationList', () => {
    it('should return static pagination data', () => {
      const paginationList = service.getPaginationList();
      expect(paginationList).toEqual([
        { value: 10, displayText: '10' },
        { value: 20, displayText: '20' },
        { value: 30, displayText: '30' },
        { value: 40, displayText: '40' },
        { value: 50, displayText: '50' },
      ]);
    });
  });

  describe('resetList', () => {
    it('should reset list$ and listCount$', () => {
      service.resetList();
      service.list$.subscribe(value => expect(value).toBeNull());
      service.listCount$.subscribe(value => expect(value).toEqual(0));
    });
  });
});
