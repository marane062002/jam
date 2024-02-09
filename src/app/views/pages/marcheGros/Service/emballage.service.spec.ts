import { TestBed } from '@angular/core/testing';

import { EmballageService } from './emballage.service';

describe('EmballageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmballageService = TestBed.get(EmballageService);
    expect(service).toBeTruthy();
  });
});
