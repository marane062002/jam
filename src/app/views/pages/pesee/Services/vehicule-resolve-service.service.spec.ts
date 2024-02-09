import { TestBed } from '@angular/core/testing';

import { VehiculeResolveServiceService } from './vehicule-resolve-service.service';

describe('VehiculeResolveServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehiculeResolveServiceService = TestBed.get(VehiculeResolveServiceService);
    expect(service).toBeTruthy();
  });
});
