import { TestBed } from '@angular/core/testing';

import { DelegataireRoutingResolveService } from './delegataire-routing-resolve.service';

describe('DelegataireRoutingResolveService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: DelegataireRoutingResolveService = TestBed.get(DelegataireRoutingResolveService);
		expect(service).toBeTruthy();
	});
});
