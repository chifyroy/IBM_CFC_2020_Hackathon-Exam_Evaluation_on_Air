import { TestBed } from '@angular/core/testing';

import { ConfigureDataService } from './configure-data.service';

describe('ConfigureDataService', () => {
  let service: ConfigureDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigureDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
