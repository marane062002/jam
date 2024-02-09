import { TestBed } from '@angular/core/testing';

import { PjUsersService } from './pj-users.service';

describe('PjUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PjUsersService = TestBed.get(PjUsersService);
    expect(service).toBeTruthy();
  });
});
