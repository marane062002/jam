import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCategorieArticleComponent } from './new-categorie-article.component';

describe('NewCategorieArticleComponent', () => {
  let component: NewCategorieArticleComponent;
  let fixture: ComponentFixture<NewCategorieArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCategorieArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCategorieArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
