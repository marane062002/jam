import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProduitUtiliseComponent } from './add-produit-utilise.component';

describe('AddProduitUtiliseComponent', () => {
  let component: AddProduitUtiliseComponent;
  let fixture: ComponentFixture<AddProduitUtiliseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProduitUtiliseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProduitUtiliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
