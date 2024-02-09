import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTypePieceJointComponent } from './show-type-piece-joint.component';

describe('ShowTypePieceJointComponent', () => {
  let component: ShowTypePieceJointComponent;
  let fixture: ComponentFixture<ShowTypePieceJointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTypePieceJointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTypePieceJointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
