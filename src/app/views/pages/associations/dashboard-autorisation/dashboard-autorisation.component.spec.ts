import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAutorisationComponent } from './dashboard-autorisation.component';

describe('DashboardAutorisationComponent', () => {
  let component: DashboardAutorisationComponent;
  let fixture: ComponentFixture<DashboardAutorisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAutorisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAutorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
