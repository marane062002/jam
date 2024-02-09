import { TestBed } from '@angular/core/testing';

import { ArrondissemntService } from './arrondissemnt.service';

describe('ArrondissemntService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArrondissemntService = TestBed.get(ArrondissemntService);
    expect(service).toBeTruthy();
  });
});
