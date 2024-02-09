import { TestBed } from '@angular/core/testing';

import { GestionCategorieService } from './gestion-categorie.service';

describe('GestionCategorieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionCategorieService = TestBed.get(GestionCategorieService);
    expect(service).toBeTruthy();
  });
});
