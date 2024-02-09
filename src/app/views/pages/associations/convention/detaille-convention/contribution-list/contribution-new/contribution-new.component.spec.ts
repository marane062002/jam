import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionNewComponent } from './contribution-new.component';

describe('ContributionNewComponent', () => {
  let component: ContributionNewComponent;
  let fixture: ComponentFixture<ContributionNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributionNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
