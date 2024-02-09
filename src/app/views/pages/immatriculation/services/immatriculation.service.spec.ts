import { TestBed } from '@angular/core/testing';

import { ImmatriculationService } from './immatriculation.service';

describe('ImmatriculationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImmatriculationService = TestBed.get(ImmatriculationService);
    expect(service).toBeTruthy();
  });
});
