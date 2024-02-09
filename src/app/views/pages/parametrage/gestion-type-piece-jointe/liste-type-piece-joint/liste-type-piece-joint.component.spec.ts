import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTypePieceJointComponent } from './liste-type-piece-joint.component';

describe('ListeTypePieceJointComponent', () => {
  let component: ListeTypePieceJointComponent;
  let fixture: ComponentFixture<ListeTypePieceJointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeTypePieceJointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTypePieceJointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
