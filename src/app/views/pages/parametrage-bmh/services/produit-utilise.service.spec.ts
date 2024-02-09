import { TestBed } from '@angular/core/testing';

import { ProduitUtiliseService } from './produit-utilise.service';

describe('ProduitUtiliseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProduitUtiliseService = TestBed.get(ProduitUtiliseService);
    expect(service).toBeTruthy();
  });
});
