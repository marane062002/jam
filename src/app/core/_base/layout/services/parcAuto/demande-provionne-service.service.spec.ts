import { TestBed } from '@angular/core/testing';

import { DemandeProvionneServiceService } from './demande-provionne-service.service';

describe('DemandeProvionneServiceService', () => {
  let service: DemandeProvionneServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeProvionneServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
