import { TestBed } from '@angular/core/testing';

import { TypeIndicDelegataireService } from './type-indic-delegataire.service';

describe('TypeIndicDelegataireService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: TypeIndicDelegataireService = TestBed.get(TypeIndicDelegataireService);
		expect(service).toBeTruthy();
	});
});
