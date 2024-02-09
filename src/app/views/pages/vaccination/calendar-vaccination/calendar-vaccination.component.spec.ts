import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarVaccinationComponent } from './calendar-vaccination.component';

describe('CalendarVaccinationComponent', () => {
  let component: CalendarVaccinationComponent;
  let fixture: ComponentFixture<CalendarVaccinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarVaccinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
