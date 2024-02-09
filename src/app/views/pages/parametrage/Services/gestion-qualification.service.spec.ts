import { TestBed } from '@angular/core/testing';

import { GestionQualificationService } from './gestion-qualification.service';

describe('GestionQualificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionQualificationService = TestBed.get(GestionQualificationService);
    expect(service).toBeTruthy();
  });
});
