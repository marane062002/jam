import { TestBed } from '@angular/core/testing';

import { TabDelegataireRoutingResolveService } from './tab-delegataire-routing-resolve.service';

describe('SuiviDelegataireRoutingResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabDelegataireRoutingResolveService = TestBed.get(TabDelegataireRoutingResolveService);
    expect(service).toBeTruthy();
  });
});
