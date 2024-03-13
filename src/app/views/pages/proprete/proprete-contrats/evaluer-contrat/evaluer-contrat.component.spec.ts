import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluerContratComponent } from './evaluer-contrat.component';

describe('EvaluerContratComponent', () => {
  let component: EvaluerContratComponent;
  let fixture: ComponentFixture<EvaluerContratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluerContratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluerContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
