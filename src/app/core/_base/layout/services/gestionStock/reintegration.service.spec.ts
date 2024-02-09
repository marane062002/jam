import { TestBed } from '@angular/core/testing';

import { ReintegrationService } from './reintegration.service';

describe('ReintegrationService', () => {
  let service: ReintegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReintegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
