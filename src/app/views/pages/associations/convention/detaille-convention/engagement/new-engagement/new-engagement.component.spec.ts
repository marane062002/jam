import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEngagementComponent } from './new-engagement.component';

describe('NewEngagementComponent', () => {
  let component: NewEngagementComponent;
  let fixture: ComponentFixture<NewEngagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEngagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
