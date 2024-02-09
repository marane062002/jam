import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotationNewComponent } from './notation-new.component';

describe('NotationNewComponent', () => {
  let component: NotationNewComponent;
  let fixture: ComponentFixture<NotationNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotationNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
