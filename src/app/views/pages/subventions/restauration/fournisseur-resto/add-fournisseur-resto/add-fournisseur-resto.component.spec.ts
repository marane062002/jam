import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFournisseurRestoComponent } from './add-fournisseur-resto.component';

describe('AddFournisseurRestoComponent', () => {
  let component: AddFournisseurRestoComponent;
  let fixture: ComponentFixture<AddFournisseurRestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFournisseurRestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFournisseurRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
