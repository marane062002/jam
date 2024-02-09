import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourriersSortantsComponent } from './add-courriers-sortants.component';

describe('AddCourriersSortantsComponent', () => {
  let component: AddCourriersSortantsComponent;
  let fixture: ComponentFixture<AddCourriersSortantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourriersSortantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourriersSortantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
