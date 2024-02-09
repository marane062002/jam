import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDecisionComponent } from './add-decision.component';

describe('AddDecisionComponent', () => {
  let component: AddDecisionComponent;
  let fixture: ComponentFixture<AddDecisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDecisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
