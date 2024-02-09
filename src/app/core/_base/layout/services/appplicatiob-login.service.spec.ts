import { TestBed } from '@angular/core/testing';

import { AppplicatiobLoginService } from './appplicatiob-login.service';

describe('AppplicatiobLoginService', () => {
  let service: AppplicatiobLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppplicatiobLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
