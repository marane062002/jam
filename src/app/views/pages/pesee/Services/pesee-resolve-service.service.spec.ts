import { TestBed } from '@angular/core/testing';

import { PeseeResolveServiceService } from './pesee-resolve-service.service';

describe('PeseeResolveServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeseeResolveServiceService = TestBed.get(PeseeResolveServiceService);
    expect(service).toBeTruthy();
  });
});
