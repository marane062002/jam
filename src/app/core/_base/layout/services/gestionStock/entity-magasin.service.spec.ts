import { TestBed } from '@angular/core/testing';

import { EntityMagasinService } from './entity-magasin.service';

describe('EntityMagasinService', () => {
  let service: EntityMagasinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityMagasinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
