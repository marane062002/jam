import { TestBed } from '@angular/core/testing';

import { PourcentageOffreFinanciereService } from './pourcentage-offre-financiere.service';

describe('PourcentageOffreFinanciereService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PourcentageOffreFinanciereService = TestBed.get(PourcentageOffreFinanciereService);
    expect(service).toBeTruthy();
  });
});
