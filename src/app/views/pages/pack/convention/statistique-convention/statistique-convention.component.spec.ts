import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueConventionComponent } from './statistique-convention.component';

describe('StatistiqueConventionComponent', () => {
  let component: StatistiqueConventionComponent;
  let fixture: ComponentFixture<StatistiqueConventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [   StatistiqueConventionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistiqueConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
