import { TestBed } from '@angular/core/testing';

import { TypeIndicSdlService } from './type-indic-sdl.service';

describe('TypeIndicSdlService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: TypeIndicSdlService = TestBed.get(TypeIndicSdlService);
		expect(service).toBeTruthy();
	});
});
