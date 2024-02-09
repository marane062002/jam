import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BienReservationListComponent } from './bien-reservation-list.component';

describe('BienReservationListComponent', () => {
  let component: BienReservationListComponent;
  let fixture: ComponentFixture<BienReservationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BienReservationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BienReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
