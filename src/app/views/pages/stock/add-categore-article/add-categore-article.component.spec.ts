import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoreArticleComponent } from './add-categore-article.component';

describe('AddCategoreArticleComponent', () => {
  let component: AddCategoreArticleComponent;
  let fixture: ComponentFixture<AddCategoreArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoreArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoreArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
