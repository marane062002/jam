import { TestBed } from '@angular/core/testing';

import { TabDelegataireService } from './tab-delegataire.service';

describe('SuiviDelegataireService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: TabDelegataireService = TestBed.get(TabDelegataireService);
		expect(service).toBeTruthy();
	});
});
