import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuantiteParSousTypeEtPeriodeModalComponent } from './quantite-par-sous-type-et-periode-modal.component';




describe('QuantiteParSousTypeEtPeriodeModalComponent', () => {
  let component: QuantiteParSousTypeEtPeriodeModalComponent;
  let fixture: ComponentFixture<QuantiteParSousTypeEtPeriodeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantiteParSousTypeEtPeriodeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantiteParSousTypeEtPeriodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
