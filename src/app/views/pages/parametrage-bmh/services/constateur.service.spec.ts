import { TestBed } from '@angular/core/testing';

import { ConstateurService } from './constateur.service';

describe('ConstateurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConstateurService = TestBed.get(ConstateurService);
    expect(service).toBeTruthy();
  });
});
