import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDestinataireCourrierConvComponent } from './add-destinataire-courrierConv.component';

describe('AddDestinataireCourrierConvComponent', () => {
  let component: AddDestinataireCourrierConvComponent;
  let fixture: ComponentFixture<AddDestinataireCourrierConvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDestinataireCourrierConvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDestinataireCourrierConvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
