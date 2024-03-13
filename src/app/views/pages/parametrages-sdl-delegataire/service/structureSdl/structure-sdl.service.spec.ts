import { TestBed } from '@angular/core/testing';

import { StructureSdlService } from './structure-sdl.service';

describe('StrucureSdlService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: StructureSdlService = TestBed.get(StructureSdlService);
        expect(service).toBeTruthy();
    });
});
