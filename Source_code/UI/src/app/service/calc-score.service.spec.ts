import { TestBed } from '@angular/core/testing';

import { CalcScoreService } from './calc-score.service';

describe('CalcScoreService', () => {
  let service: CalcScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalcScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
