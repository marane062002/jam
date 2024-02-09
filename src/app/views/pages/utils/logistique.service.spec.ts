import { TestBed } from '@angular/core/testing';

import { LogistiqueService } from './logistique.service';

describe('LogistiqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogistiqueService = TestBed.get(LogistiqueService);
    expect(service).toBeTruthy();
  });
});
