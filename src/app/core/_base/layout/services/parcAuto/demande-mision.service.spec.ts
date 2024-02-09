import { TestBed } from '@angular/core/testing';

import { DemandeMisionService } from './demande-mision.service';

describe('DemandeMisionService', () => {
  let service: DemandeMisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeMisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
