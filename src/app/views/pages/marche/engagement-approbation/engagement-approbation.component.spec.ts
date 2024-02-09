import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementApprobationComponent } from './engagement-approbation.component';

describe('EngagementApprobationComponent', () => {
  let component: EngagementApprobationComponent;
  let fixture: ComponentFixture<EngagementApprobationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngagementApprobationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementApprobationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
