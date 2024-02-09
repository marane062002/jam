import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDecisionComponent } from './action-decision.component';

describe('ActionDecisionComponent', () => {
  let component: ActionDecisionComponent;
  let fixture: ComponentFixture<ActionDecisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionDecisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
