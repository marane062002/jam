import { TestBed } from '@angular/core/testing';

import { OrganismeService } from './organisme.service';

describe('OrganismeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrganismeService = TestBed.get(OrganismeService);
    expect(service).toBeTruthy();
  });
});
