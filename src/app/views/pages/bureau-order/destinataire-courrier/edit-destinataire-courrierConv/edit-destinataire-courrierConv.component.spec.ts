import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDestinataireCourrierConvComponent } from './edit-destinataire-courrierConv.component';

describe('EditDestinataireCourrierConvComponent', () => {
  let component: EditDestinataireCourrierConvComponent;
  let fixture: ComponentFixture<EditDestinataireCourrierConvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDestinataireCourrierConvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDestinataireCourrierConvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
