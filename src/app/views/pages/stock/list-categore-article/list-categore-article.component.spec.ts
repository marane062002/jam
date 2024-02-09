import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoreArticleComponent } from './list-categore-article.component';

describe('ListCategoreArticleComponent', () => {
  let component: ListCategoreArticleComponent;
  let fixture: ComponentFixture<ListCategoreArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCategoreArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategoreArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
