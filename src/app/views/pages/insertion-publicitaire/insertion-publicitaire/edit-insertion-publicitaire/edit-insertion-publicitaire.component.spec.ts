import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsertionPublicitaireComponent } from './edit-insertion-publicitaire.component';

describe('EditInsertionPublicitaireComponent', () => {
  let component: EditInsertionPublicitaireComponent;
  let fixture: ComponentFixture<EditInsertionPublicitaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInsertionPublicitaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInsertionPublicitaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
