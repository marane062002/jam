import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionCommissionConseilDetailComponent } from './reunion-commission-conseil-detail.component';

describe('ReunionCommissionConseilDetailComponent', () => {
  let component: ReunionCommissionConseilDetailComponent;
  let fixture: ComponentFixture<ReunionCommissionConseilDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReunionCommissionConseilDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunionCommissionConseilDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
