import { TestBed } from '@angular/core/testing';

import { PrestataireService } from './prestataire.service';

describe('PrestataireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrestataireService = TestBed.get(PrestataireService);
    expect(service).toBeTruthy();
  });
});
