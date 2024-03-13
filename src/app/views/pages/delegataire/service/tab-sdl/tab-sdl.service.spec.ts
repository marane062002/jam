import { TestBed } from '@angular/core/testing';

import { TabSdlService } from './tab-sdl.service';

describe('SuiviSdlService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: TabSdlService = TestBed.get(TabSdlService);
		expect(service).toBeTruthy();
	});
});
