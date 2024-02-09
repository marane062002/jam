import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditCategorieComponent } from './dialog-edit-categorie.component';

describe('DialogEditCategorieComponent', () => {
  let component: DialogEditCategorieComponent;
  let fixture: ComponentFixture<DialogEditCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
