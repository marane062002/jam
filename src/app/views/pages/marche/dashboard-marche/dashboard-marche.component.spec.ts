import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMarcheComponent } from './dashboard-marche.component';

describe('DashboardMarcheComponent', () => {
  let component: DashboardMarcheComponent;
  let fixture: ComponentFixture<DashboardMarcheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMarcheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
