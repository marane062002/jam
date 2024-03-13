import { TestBed } from '@angular/core/testing';

import { SdlRoutingResolveService } from './sdl-routing-resolve.service';

describe('SdlRoutingResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SdlRoutingResolveService = TestBed.get(SdlRoutingResolveService);
    expect(service).toBeTruthy();
  });
});
