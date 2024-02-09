import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChComponent } from './dialog-ch.component';

describe('DialogChComponent', () => {
  let component: DialogChComponent;
  let fixture: ComponentFixture<DialogChComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogChComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
