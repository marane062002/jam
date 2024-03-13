import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationCircuitsComponent } from './evaluation-circuits.component';

describe('EvaluationCircuitsComponent', () => {
  let component: EvaluationCircuitsComponent;
  let fixture: ComponentFixture<EvaluationCircuitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationCircuitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationCircuitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
