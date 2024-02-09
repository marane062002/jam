import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceReunionCommissionComponent } from './presence-reunion-commission.component';

describe('PresenceReunionCommissionComponent', () => {
  let component: PresenceReunionCommissionComponent;
  let fixture: ComponentFixture<PresenceReunionCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresenceReunionCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceReunionCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
