import { TestBed } from '@angular/core/testing';

import { EmballageResolveServiceService } from './emballage-resolve-service.service';

describe('EmballageResolveServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmballageResolveServiceService = TestBed.get(EmballageResolveServiceService);
    expect(service).toBeTruthy();
  });
});
