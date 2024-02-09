import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypePieceJointComponent } from './edit-type-piece-joint.component';

describe('EditTypePieceJointComponent', () => {
  let component: EditTypePieceJointComponent;
  let fixture: ComponentFixture<EditTypePieceJointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTypePieceJointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTypePieceJointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
