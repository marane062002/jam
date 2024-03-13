import { TestBed } from '@angular/core/testing';

import { StructureDelegataireService } from './structure-delegataire.service';

describe('StrucureDelegataireService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: StructureDelegataireService = TestBed.get(StructureDelegataireService);
		expect(service).toBeTruthy();
	});
});
