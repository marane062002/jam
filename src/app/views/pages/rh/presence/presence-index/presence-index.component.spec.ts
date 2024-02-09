import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceIndexComponent } from './presence-index.component';

describe('PresenceIndexComponent', () => {
  let component: PresenceIndexComponent;
  let fixture: ComponentFixture<PresenceIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresenceIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
