import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAssociationComponent } from './dashboard-association.component';

describe('DashboardAssociationComponent', () => {
  let component: DashboardAssociationComponent;
  let fixture: ComponentFixture<DashboardAssociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAssociationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
