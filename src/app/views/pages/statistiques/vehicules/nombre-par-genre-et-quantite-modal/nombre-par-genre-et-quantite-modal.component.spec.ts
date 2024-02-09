import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NombreParGenreEtQuantiteModalComponent } from './nombre-par-genre-et-quantite-modal.component';



describe('NombreParGenreEtQuantiteModalComponent', () => {
  let component: NombreParGenreEtQuantiteModalComponent;
  let fixture: ComponentFixture<NombreParGenreEtQuantiteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NombreParGenreEtQuantiteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NombreParGenreEtQuantiteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
