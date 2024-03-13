import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusLogisticDialogComponent } from './status-logistic-dialog.component';

describe('StatusLogisticDialogComponent', () => {
  let component: StatusLogisticDialogComponent;
  let fixture: ComponentFixture<StatusLogisticDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusLogisticDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusLogisticDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
