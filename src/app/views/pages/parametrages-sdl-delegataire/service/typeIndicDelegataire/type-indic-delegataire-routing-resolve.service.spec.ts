import { TestBed } from '@angular/core/testing';

import { TypeIndicDelegataireRoutingResolveService } from './type-indic-delegataire-routing-resolve.service';

describe('TypeIndicDelegataireRoutingResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeIndicDelegataireRoutingResolveService = TestBed.get(TypeIndicDelegataireRoutingResolveService);
    expect(service).toBeTruthy();
  });
});
