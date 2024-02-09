import { TestBed } from '@angular/core/testing';

import { GestionModePassationService } from './gestion-mode-passation.service';

describe('GestionModePassationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionModePassationService = TestBed.get(GestionModePassationService);
    expect(service).toBeTruthy();
  });
});
