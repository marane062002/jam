import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionCommissionConseilListComponent } from './reunion-commission-conseil-list.component';

describe('ReunionCommissionConseilListComponent', () => {
  let component: ReunionCommissionConseilListComponent;
  let fixture: ComponentFixture<ReunionCommissionConseilListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReunionCommissionConseilListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunionCommissionConseilListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
