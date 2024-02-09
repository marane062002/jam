import { TestBed } from '@angular/core/testing';

import { ConsistanceConventionService } from './consistance-convention.service';

describe('ConsistanceConventionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsistanceConventionService = TestBed.get(ConsistanceConventionService);
    expect(service).toBeTruthy();
  });
});
