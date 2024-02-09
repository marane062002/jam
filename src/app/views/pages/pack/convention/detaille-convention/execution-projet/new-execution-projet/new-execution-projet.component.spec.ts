import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSuiviContributionComponent } from './new-suivi-contribution.component';

describe('NewSuiviContributionComponent', () => {
  let component: NewSuiviContributionComponent;
  let fixture: ComponentFixture<NewSuiviContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSuiviContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSuiviContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
