import { TestBed } from '@angular/core/testing';

import { AffairesConseilService } from './affaires-conseil.service';

describe('AffairesConseilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AffairesConseilService = TestBed.get(AffairesConseilService);
    expect(service).toBeTruthy();
  });
});
