import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmeDashboardComponent } from './pme-dashboard.component';

describe('PmeDashboardComponent', () => {
  let component: PmeDashboardComponent;
  let fixture: ComponentFixture<PmeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
