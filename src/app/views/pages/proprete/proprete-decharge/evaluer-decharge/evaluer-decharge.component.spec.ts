import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluerDechargeComponent } from './evaluer-decharge.component';

describe('EvaluerDechargeComponent', () => {
  let component: EvaluerDechargeComponent;
  let fixture: ComponentFixture<EvaluerDechargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluerDechargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluerDechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
