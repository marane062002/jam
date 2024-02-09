import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDecisionComponent } from './update-decision.component';

describe('UpdateDecisionComponent', () => {
  let component: UpdateDecisionComponent;
  let fixture: ComponentFixture<UpdateDecisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDecisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
