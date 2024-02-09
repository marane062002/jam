import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategorieArticleComponent } from './edit-categorie-article.component';

describe('EditCategorieArticleComponent', () => {
  let component: EditCategorieArticleComponent;
  let fixture: ComponentFixture<EditCategorieArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCategorieArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategorieArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
