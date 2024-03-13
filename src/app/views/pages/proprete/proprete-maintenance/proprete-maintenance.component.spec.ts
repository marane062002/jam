import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropreteMaintenanceComponent } from './proprete-maintenance.component';

describe('PropreteMaintenanceComponent', () => {
  let component: PropreteMaintenanceComponent;
  let fixture: ComponentFixture<PropreteMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropreteMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropreteMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
