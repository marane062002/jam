import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionConseilListComponent } from './commission-conseil-list.component';

describe('CommissionConseilListComponent', () => {
  let component: CommissionConseilListComponent;
  let fixture: ComponentFixture<CommissionConseilListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionConseilListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionConseilListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
