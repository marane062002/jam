import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFournisseurRestoComponent } from './edit-fournisseur-resto.component';

describe('EditFournisseurRestoComponent', () => {
  let component: EditFournisseurRestoComponent;
  let fixture: ComponentFixture<EditFournisseurRestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFournisseurRestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFournisseurRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
