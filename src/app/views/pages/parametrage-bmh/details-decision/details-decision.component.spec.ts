import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDecisionComponent } from './details-decision.component';

describe('DetailsDecisionComponent', () => {
  let component: DetailsDecisionComponent;
  let fixture: ComponentFixture<DetailsDecisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDecisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
