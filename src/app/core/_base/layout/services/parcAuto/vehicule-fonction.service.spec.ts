import { TestBed } from '@angular/core/testing';

import { VehiculeFonctionService } from './vehicule-fonction.service';

describe('VehiculeFonctionService', () => {
  let service: VehiculeFonctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculeFonctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
