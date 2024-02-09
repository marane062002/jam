import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviContributionComponent } from './suivi-contribution.component';

describe('SuiviContributionComponent', () => {
  let component: SuiviContributionComponent;
  let fixture: ComponentFixture<SuiviContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiviContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
