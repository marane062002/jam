import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationPointAudienceComponent } from './evaluation-point-audience.component';

describe('EvaluationPointAudienceComponent', () => {
  let component: EvaluationPointAudienceComponent;
  let fixture: ComponentFixture<EvaluationPointAudienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationPointAudienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationPointAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
