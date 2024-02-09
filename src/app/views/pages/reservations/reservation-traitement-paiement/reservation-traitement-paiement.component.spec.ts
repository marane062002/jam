import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationTraitementPaiementComponent } from './reservation-traitement-paiement.component';

describe('ReservationTraitementPaiementComponent', () => {
  let component: ReservationTraitementPaiementComponent;
  let fixture: ComponentFixture<ReservationTraitementPaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationTraitementPaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationTraitementPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
