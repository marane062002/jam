import { TestBed } from '@angular/core/testing';

import { SdlService } from './sdl.service';

describe('SdlService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: SdlService = TestBed.get(SdlService);
        expect(service).toBeTruthy();
    });
});
