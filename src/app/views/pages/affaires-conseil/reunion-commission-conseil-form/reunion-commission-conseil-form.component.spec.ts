import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionCommissionConseilFormComponent } from './reunion-commission-conseil-form.component';

describe('ReunionCommissionConseilFormComponent', () => {
  let component: ReunionCommissionConseilFormComponent;
  let fixture: ComponentFixture<ReunionCommissionConseilFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReunionCommissionConseilFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunionCommissionConseilFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
