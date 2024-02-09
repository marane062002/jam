import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddTypeComponent } from './dialog-add-type.component';

describe('DialogAddTypeComponent', () => {
  let component: DialogAddTypeComponent;
  let fixture: ComponentFixture<DialogAddTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
