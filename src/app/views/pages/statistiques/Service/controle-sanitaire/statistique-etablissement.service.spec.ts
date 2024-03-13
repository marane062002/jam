import { TestBed } from '@angular/core/testing';

import { StatistiqueEtablissementService } from './statistique-etablissement.service';

describe('StatistiqueEtablissementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatistiqueEtablissementService = TestBed.get(StatistiqueEtablissementService);
    expect(service).toBeTruthy();
  });
});
