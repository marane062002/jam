import { TestBed } from '@angular/core/testing';

import { PersonnePhysiqueService } from './personne-physique.service';

describe('PersonnePhysiqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonnePhysiqueService = TestBed.get(PersonnePhysiqueService);
    expect(service).toBeTruthy();
  });
});
