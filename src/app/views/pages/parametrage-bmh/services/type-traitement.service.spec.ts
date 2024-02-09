import { TestBed } from '@angular/core/testing';

import { TypeTraitementService } from './type-traitement.service';

describe('TypeTraitementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeTraitementService = TestBed.get(TypeTraitementService);
    expect(service).toBeTruthy();
  });
});
