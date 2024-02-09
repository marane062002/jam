import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardArrondissementComponent } from './dashboard-arrondissement.component';

describe('DashboardArrondissementComponent', () => {
  let component: DashboardArrondissementComponent;
  let fixture: ComponentFixture<DashboardArrondissementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardArrondissementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardArrondissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
