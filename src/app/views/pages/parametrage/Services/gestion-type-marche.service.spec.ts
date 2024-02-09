import { TestBed } from '@angular/core/testing';

import { GestionTypeMarcheService } from './gestion-type-marche.service';

describe('GestionTypeMarcheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionTypeMarcheService = TestBed.get(GestionTypeMarcheService);
    expect(service).toBeTruthy();
  });
});
