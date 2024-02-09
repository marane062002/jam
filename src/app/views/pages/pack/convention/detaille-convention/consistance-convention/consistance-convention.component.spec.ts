import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsistanceConventionComponent } from './consistance-convention.component';

describe('SuiviContributionComponent', () => {
  let component: ConsistanceConventionComponent;
  let fixture: ComponentFixture<ConsistanceConventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsistanceConventionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsistanceConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
