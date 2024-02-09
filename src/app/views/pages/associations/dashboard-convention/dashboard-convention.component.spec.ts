import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardConventionComponent } from './dashboard-convention.component';

describe('DashboardConventionComponent', () => {
  let component: DashboardConventionComponent;
  let fixture: ComponentFixture<DashboardConventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardConventionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
