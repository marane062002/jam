import { TestBed } from '@angular/core/testing';

import { TypeDeclarationService } from './type-declaration.service';

describe('TypeDeclarationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeDeclarationService = TestBed.get(TypeDeclarationService);
    expect(service).toBeTruthy();
  });
});
