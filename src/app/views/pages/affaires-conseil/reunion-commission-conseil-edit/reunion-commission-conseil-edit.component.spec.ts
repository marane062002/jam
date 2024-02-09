import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionCommissionConseilEditComponent } from './reunion-commission-conseil-edit.component';

describe('ReunionCommissionConseilEditComponent', () => {
  let component: ReunionCommissionConseilEditComponent;
  let fixture: ComponentFixture<ReunionCommissionConseilEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReunionCommissionConseilEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunionCommissionConseilEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
