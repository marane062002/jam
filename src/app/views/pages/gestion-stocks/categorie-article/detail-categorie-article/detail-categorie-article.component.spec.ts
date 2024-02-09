import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCategorieArticleComponent } from './detail-categorie-article.component';

describe('DetailCategorieArticleComponent', () => {
  let component: DetailCategorieArticleComponent;
  let fixture: ComponentFixture<DetailCategorieArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCategorieArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCategorieArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
