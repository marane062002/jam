import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NombreParGenreEtQuantiteComponent } from './nombre-par-genre-et-quantite.component';



describe('NombreParGenreEtQuantiteComponent', () => {
  let component: NombreParGenreEtQuantiteComponent;
  let fixture: ComponentFixture<NombreParGenreEtQuantiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NombreParGenreEtQuantiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NombreParGenreEtQuantiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
