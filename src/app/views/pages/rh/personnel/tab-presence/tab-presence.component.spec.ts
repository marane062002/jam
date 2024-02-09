import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPresenceComponent } from './tab-presence.component';

describe('TabPresenceComponent', () => {
  let component: TabPresenceComponent;
  let fixture: ComponentFixture<TabPresenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabPresenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
