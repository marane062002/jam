import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceAudienceComponent } from './presence-audience.component';

describe('PresenceAudienceComponent', () => {
  let component: PresenceAudienceComponent;
  let fixture: ComponentFixture<PresenceAudienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresenceAudienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
