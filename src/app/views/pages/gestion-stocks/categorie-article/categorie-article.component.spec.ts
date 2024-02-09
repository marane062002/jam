import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieArticleComponent } from './categorie-article.component';

describe('CategorieArticleComponent', () => {
  let component: CategorieArticleComponent;
  let fixture: ComponentFixture<CategorieArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
