import { TestBed } from '@angular/core/testing';

import { DemandesService } from './demandes.service';

describe('DemandesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DemandesService = TestBed.get(DemandesService);
    expect(service).toBeTruthy();
  });
});
