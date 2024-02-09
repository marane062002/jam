import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceNewComponent } from './presence-new.component';

describe('PresenceNewComponent', () => {
  let component: PresenceNewComponent;
  let fixture: ComponentFixture<PresenceNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresenceNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
