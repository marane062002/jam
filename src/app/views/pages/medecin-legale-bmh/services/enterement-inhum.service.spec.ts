import { TestBed } from '@angular/core/testing';

import { EnterementInhumService } from './enterement-inhum.service';

describe('EnterementInhumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnterementInhumService = TestBed.get(EnterementInhumService);
    expect(service).toBeTruthy();
  });
});
