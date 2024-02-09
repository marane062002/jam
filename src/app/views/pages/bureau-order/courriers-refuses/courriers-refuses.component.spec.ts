import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourriersRefusesComponent } from './courriers-refuses.component';

describe('CourriersRefusesComponent', () => {
  let component: CourriersRefusesComponent;
  let fixture: ComponentFixture<CourriersRefusesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourriersRefusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourriersRefusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
