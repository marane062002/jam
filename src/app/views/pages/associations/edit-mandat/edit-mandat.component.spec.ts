import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMandatComponent } from './edit-mandat.component';

describe('EditMandatComponent', () => {
  let component: EditMandatComponent;
  let fixture: ComponentFixture<EditMandatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMandatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMandatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
