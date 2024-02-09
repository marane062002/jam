import { TestBed } from '@angular/core/testing';

import { PermanenceService } from './permanence.service';

describe('PermanenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermanenceService = TestBed.get(PermanenceService);
    expect(service).toBeTruthy();
  });
});
