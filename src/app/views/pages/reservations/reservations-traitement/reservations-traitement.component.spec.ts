import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsTraitementComponent } from './reservations-traitement.component';

describe('ReservationsTraitementComponent', () => {
  let component: ReservationsTraitementComponent;
  let fixture: ComponentFixture<ReservationsTraitementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationsTraitementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
