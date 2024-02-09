import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCategorieComponent } from './dialog-add-categorie.component';

describe('DialogAddCategorieComponent', () => {
  let component: DialogAddCategorieComponent;
  let fixture: ComponentFixture<DialogAddCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
