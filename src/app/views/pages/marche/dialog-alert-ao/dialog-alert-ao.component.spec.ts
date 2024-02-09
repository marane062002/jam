import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogALertAOComponent } from './dialog-alert-ao.component';

describe('DialogALertAOComponent', () => {
  let component: DialogALertAOComponent;
  let fixture: ComponentFixture<DialogALertAOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogALertAOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogALertAOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
