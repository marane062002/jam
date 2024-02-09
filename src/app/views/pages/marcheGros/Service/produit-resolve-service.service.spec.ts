import { TestBed } from '@angular/core/testing';

import { ProduitResolveServiceService } from './produit-resolve-service.service';

describe('ProduitResolveServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProduitResolveServiceService = TestBed.get(ProduitResolveServiceService);
    expect(service).toBeTruthy();
  });
});
