import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConsistanceConventionComponent } from './new-consistance-convention.component';

describe('NewSuiviContributionComponent', () => {
  let component: NewConsistanceConventionComponent;
  let fixture: ComponentFixture<NewConsistanceConventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConsistanceConventionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConsistanceConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
