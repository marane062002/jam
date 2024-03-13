import { TestBed } from '@angular/core/testing';

import { StructureDelegataireRoutingResolveService } from './structure-delegataire-routing-resolve.service';

describe('StructureDelegataireRoutingResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StructureDelegataireRoutingResolveService = TestBed.get(StructureDelegataireRoutingResolveService);
    expect(service).toBeTruthy();
  });
});
