import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueProgrammeComponent } from './statistique-programme.component';

describe('StatistiqueProgrammeComponent', () => {
  let component: StatistiqueProgrammeComponent;
  let fixture: ComponentFixture<StatistiqueProgrammeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [   StatistiqueProgrammeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistiqueProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
