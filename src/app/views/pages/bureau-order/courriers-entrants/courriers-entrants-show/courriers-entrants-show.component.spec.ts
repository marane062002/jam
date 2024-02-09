import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourriersEntrantsShowComponent } from './courriers-entrants-show.component';

describe('CourriersEntrantsShowComponent', () => {
  let component: CourriersEntrantsShowComponent;
  let fixture: ComponentFixture<CourriersEntrantsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourriersEntrantsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourriersEntrantsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
