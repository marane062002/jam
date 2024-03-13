import { TestBed } from '@angular/core/testing';

import { ControleurService } from './controleur.service';

describe('ControleurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ControleurService = TestBed.get(ControleurService);
    expect(service).toBeTruthy();
  });
});
