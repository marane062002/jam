import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionConseilDetailComponent } from './commission-conseil-detail.component';

describe('CommissionConseilDetailComponent', () => {
  let component: CommissionConseilDetailComponent;
  let fixture: ComponentFixture<CommissionConseilDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionConseilDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionConseilDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
