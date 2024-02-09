import { TestBed } from '@angular/core/testing';

import { MorgueService } from './morgue.service';

describe('MorgueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MorgueService = TestBed.get(MorgueService);
    expect(service).toBeTruthy();
  });
});
