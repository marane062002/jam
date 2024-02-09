import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypePieceJointComponent } from './add-type-piece-joint.component';

describe('AddTypePieceJointComponent', () => {
  let component: AddTypePieceJointComponent;
  let fixture: ComponentFixture<AddTypePieceJointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypePieceJointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypePieceJointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
