import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationPointBureauComponent } from './evaluation-point-bureau.component';

describe('EvaluationPointBureauComponent', () => {
  let component: EvaluationPointBureauComponent;
  let fixture: ComponentFixture<EvaluationPointBureauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationPointBureauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationPointBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
