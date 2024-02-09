import { TestBed } from '@angular/core/testing';
import { MarchandiseEtCarreauxService } from './marchandise-et-carreaux.service';



describe('MarchandiseEtCarreauxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarchandiseEtCarreauxService = TestBed.get(MarchandiseEtCarreauxService);
    expect(service).toBeTruthy();
  });
});
