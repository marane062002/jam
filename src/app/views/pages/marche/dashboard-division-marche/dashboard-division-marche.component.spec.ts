import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDivisionMarcheComponent } from './dashboard-division-marche.component';

describe('DashboardDivisionMarcheComponent', () => {
  let component: DashboardDivisionMarcheComponent;
  let fixture: ComponentFixture<DashboardDivisionMarcheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDivisionMarcheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDivisionMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
