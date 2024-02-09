import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BienReservationFormComponent } from './bien-reservation-form.component';

describe('BienReservationFormComponent', () => {
  let component: BienReservationFormComponent;
  let fixture: ComponentFixture<BienReservationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BienReservationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BienReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
