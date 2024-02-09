import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEdComponent } from './dialog-ed.component';

describe('DialogEdComponent', () => {
  let component: DialogEdComponent;
  let fixture: ComponentFixture<DialogEdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
