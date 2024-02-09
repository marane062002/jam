import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDecisionComponent } from './list-decision.component';

describe('ListDecisionComponent', () => {
  let component: ListDecisionComponent;
  let fixture: ComponentFixture<ListDecisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDecisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
