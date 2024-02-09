import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionConseilComponent } from './commission-conseil.component';

describe('CommissionConseilComponent', () => {
  let component: CommissionConseilComponent;
  let fixture: ComponentFixture<CommissionConseilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionConseilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionConseilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
