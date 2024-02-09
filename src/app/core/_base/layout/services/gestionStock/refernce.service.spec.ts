import { TestBed } from '@angular/core/testing';

import { RefernceService } from './refernce.service';

describe('RefernceService', () => {
  let service: RefernceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefernceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
