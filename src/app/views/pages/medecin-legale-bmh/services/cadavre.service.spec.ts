import { TestBed } from '@angular/core/testing';

import { CadavreService } from './cadavre.service';

describe('CadavreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadavreService = TestBed.get(CadavreService);
    expect(service).toBeTruthy();
  });
});
