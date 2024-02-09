import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFournisseurRestoComponent } from './list-fournisseur-resto.component';

describe('ListFournisseurRestoComponent', () => {
  let component: ListFournisseurRestoComponent;
  let fixture: ComponentFixture<ListFournisseurRestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFournisseurRestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFournisseurRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
