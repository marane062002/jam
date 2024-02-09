import { TestBed } from '@angular/core/testing';

import { JourneeService } from './journee.service';

describe('JourneeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JourneeService = TestBed.get(JourneeService);
    expect(service).toBeTruthy();
  });
});
