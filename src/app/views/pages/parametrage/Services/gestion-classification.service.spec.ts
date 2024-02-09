import { TestBed } from '@angular/core/testing';

import { GestionClassificationService } from './gestion-classification.service';

describe('GestionClassificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionClassificationService = TestBed.get(GestionClassificationService);
    expect(service).toBeTruthy();
  });
});
