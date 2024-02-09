import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCategorieComponent } from './show-categorie.component';

describe('ShowCategorieComponent', () => {
  let component: ShowCategorieComponent;
  let fixture: ComponentFixture<ShowCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
