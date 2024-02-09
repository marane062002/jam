import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuantiteParSousTypeEtPeriodeComponent } from './quantite-par-sous-type-et-periode.component';




describe('QuantiteParSousTypeEtPeriodeComponent', () => {
  let component: QuantiteParSousTypeEtPeriodeComponent;
  let fixture: ComponentFixture<QuantiteParSousTypeEtPeriodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantiteParSousTypeEtPeriodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantiteParSousTypeEtPeriodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
