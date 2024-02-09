import { TestBed } from '@angular/core/testing';

import { SoucheService } from './souche.service';

describe('SoucheService', () => {
  let service: SoucheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoucheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
