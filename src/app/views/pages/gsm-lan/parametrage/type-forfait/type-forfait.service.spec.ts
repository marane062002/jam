import { TestBed } from '@angular/core/testing';

import { TypeForfaitService } from './type-forfait.service';

describe('TypeForfaitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeForfaitService = TestBed.get(TypeForfaitService);
    expect(service).toBeTruthy();
  });
});
