import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BienReservationEditComponent } from './bien-reservation-edit.component';

describe('BienReservationEditComponent', () => {
  let component: BienReservationEditComponent;
  let fixture: ComponentFixture<BienReservationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BienReservationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BienReservationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
