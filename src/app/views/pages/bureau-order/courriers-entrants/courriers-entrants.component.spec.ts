import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourriersEntrantsComponent } from './courriers-entrants.component';

describe('CourriersEntrantsComponent', () => {
  let component: CourriersEntrantsComponent;
  let fixture: ComponentFixture<CourriersEntrantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourriersEntrantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourriersEntrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
