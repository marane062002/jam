import { TestBed } from '@angular/core/testing';

import { TypeServiceService } from './type-service.service';

describe('TypeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeServiceService = TestBed.get(TypeServiceService);
    expect(service).toBeTruthy();
  });
});
