import { TestBed } from '@angular/core/testing';

import { TabSdlRoutingResolveService } from './tab-sdl-routing-resolve.service';

describe('SuiviSdlRoutingResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabSdlRoutingResolveService = TestBed.get(TabSdlRoutingResolveService);
    expect(service).toBeTruthy();
  });
});
