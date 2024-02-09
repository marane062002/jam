import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategorieProduitComponent } from './list-categorie-produit.component';

describe('ListCategorieProduitComponent', () => {
  let component: ListCategorieProduitComponent;
  let fixture: ComponentFixture<ListCategorieProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCategorieProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategorieProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
