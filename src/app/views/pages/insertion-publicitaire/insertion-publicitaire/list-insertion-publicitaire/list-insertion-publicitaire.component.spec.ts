import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInsertionPublicitaireComponent } from './list-insertion-publicitaire.component';

describe('ListInsertionPublicitaireComponent', () => {
  let component: ListInsertionPublicitaireComponent;
  let fixture: ComponentFixture<ListInsertionPublicitaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInsertionPublicitaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInsertionPublicitaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
