import { TestBed } from '@angular/core/testing';

import { BloodSugarService } from './blood-sugar.service';

describe('BloodSugarService', () => {
  let service: BloodSugarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloodSugarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
