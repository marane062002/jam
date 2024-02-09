import { TestBed } from '@angular/core/testing';

import { GestionDesTypesAoService } from './gestion-des-types-ao.service';

describe('GestionDesTypesAoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionDesTypesAoService = TestBed.get(GestionDesTypesAoService);
    expect(service).toBeTruthy();
  });
});
