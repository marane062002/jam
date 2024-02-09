import { TestBed } from '@angular/core/testing';

import { OrigineService } from './origine.service';

describe('OrigineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrigineService = TestBed.get(OrigineService);
    expect(service).toBeTruthy();
  });
});
