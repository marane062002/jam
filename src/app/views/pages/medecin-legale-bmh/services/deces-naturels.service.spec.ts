import { TestBed } from '@angular/core/testing';

import { DecesNaturelsService } from './deces-naturels.service';

describe('DecesNaturelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DecesNaturelsService = TestBed.get(DecesNaturelsService);
    expect(service).toBeTruthy();
  });
});
