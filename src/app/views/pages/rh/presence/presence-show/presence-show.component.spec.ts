import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceShowComponent } from './presence-show.component';

describe('PresenceShowComponent', () => {
  let component: PresenceShowComponent;
  let fixture: ComponentFixture<PresenceShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresenceShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
