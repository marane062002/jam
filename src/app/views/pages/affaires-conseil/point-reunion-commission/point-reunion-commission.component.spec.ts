import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointReunionCommissionComponent } from './point-reunion-commission.component';

describe('PointReunionCommissionComponent', () => {
  let component: PointReunionCommissionComponent;
  let fixture: ComponentFixture<PointReunionCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointReunionCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointReunionCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
