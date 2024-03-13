import { TestBed } from '@angular/core/testing';

import { DelegataireService } from './delegataire.service';

describe('DelegataireService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: DelegataireService = TestBed.get(DelegataireService);
        expect(service).toBeTruthy();
    });
});
