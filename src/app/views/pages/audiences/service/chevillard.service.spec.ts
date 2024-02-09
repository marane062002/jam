import { TestBed } from '@angular/core/testing';

import { ChevillardService } from './chevillard.service';

describe('ChevillardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChevillardService = TestBed.get(ChevillardService);
    expect(service).toBeTruthy();
  });
});
