import { TestBed } from '@angular/core/testing';

import { CentralDataService } from './central-data.service';

describe('CentralDataService', () => {
  let service: CentralDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentralDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
