import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProduitUtiliseComponent } from './list-produit-utilise.component';

describe('ListProduitUtiliseComponent', () => {
  let component: ListProduitUtiliseComponent;
  let fixture: ComponentFixture<ListProduitUtiliseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProduitUtiliseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProduitUtiliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
