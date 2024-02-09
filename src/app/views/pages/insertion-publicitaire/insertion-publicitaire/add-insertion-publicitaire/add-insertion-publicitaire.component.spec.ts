import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsertionPublicitaireComponent } from './add-insertion-publicitaire.component';

describe('AddInsertionPublicitaireComponent', () => {
  let component: AddInsertionPublicitaireComponent;
  let fixture: ComponentFixture<AddInsertionPublicitaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInsertionPublicitaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInsertionPublicitaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
