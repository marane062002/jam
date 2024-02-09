import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProduitUtiliseComponent } from './update-produit-utilise.component';

describe('UpdateProduitUtiliseComponent', () => {
  let component: UpdateProduitUtiliseComponent;
  let fixture: ComponentFixture<UpdateProduitUtiliseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProduitUtiliseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProduitUtiliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
