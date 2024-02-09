import { TestBed } from '@angular/core/testing';

import { BiensReservationService } from './biens-reservation.service';

describe('BiensReservationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BiensReservationService = TestBed.get(BiensReservationService);
    expect(service).toBeTruthy();
  });
});
