import { TestBed } from '@angular/core/testing';

import { ConducteurService } from './conducteur.service';

describe('ConducteurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConducteurService = TestBed.get(ConducteurService);
    expect(service).toBeTruthy();
  });
});
