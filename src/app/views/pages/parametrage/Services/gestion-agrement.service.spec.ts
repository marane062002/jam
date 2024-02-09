import { TestBed } from '@angular/core/testing';

import { GestionAgrementService } from './gestion-agrement.service';

describe('GestionAgrementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionAgrementService = TestBed.get(GestionAgrementService);
    expect(service).toBeTruthy();
  });
});
