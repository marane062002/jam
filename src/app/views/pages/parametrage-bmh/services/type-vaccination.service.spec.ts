import { TestBed } from '@angular/core/testing';

import { TypeVaccinationService } from './type-vaccination.service';

describe('TypeVaccinationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeVaccinationService = TestBed.get(TypeVaccinationService);
    expect(service).toBeTruthy();
  });
});
