import { TestBed } from '@angular/core/testing';

import { DisponibiliteFondsService } from './disponibilite-fonds.service';

describe('DisponibiliteFondsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisponibiliteFondsService = TestBed.get(DisponibiliteFondsService);
    expect(service).toBeTruthy();
  });
});
