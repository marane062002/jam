import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsDetailComponent } from './reservations-detail.component';

describe('ReservationsDetailComponent', () => {
  let component: ReservationsDetailComponent;
  let fixture: ComponentFixture<ReservationsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
