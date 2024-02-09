import { TestBed } from '@angular/core/testing';

import { PersonneMoraleService } from './personne-morale.service';

describe('PersonneMoraleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonneMoraleService = TestBed.get(PersonneMoraleService);
    expect(service).toBeTruthy();
  });
});
