import { TestBed } from '@angular/core/testing';

import { SousTypeService } from './sous-type.service';

describe('SousTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SousTypeService = TestBed.get(SousTypeService);
    expect(service).toBeTruthy();
  });
});
