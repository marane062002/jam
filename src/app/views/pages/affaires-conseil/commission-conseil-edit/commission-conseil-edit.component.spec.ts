import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionConseilEditComponent } from './commission-conseil-edit.component';

describe('CommissionConseilEditComponent', () => {
  let component: CommissionConseilEditComponent;
  let fixture: ComponentFixture<CommissionConseilEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionConseilEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionConseilEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
