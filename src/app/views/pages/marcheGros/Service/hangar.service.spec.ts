import { TestBed } from '@angular/core/testing';

import { HangarService } from './hangar.service';

describe('HangarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HangarService = TestBed.get(HangarService);
    expect(service).toBeTruthy();
  });
});
