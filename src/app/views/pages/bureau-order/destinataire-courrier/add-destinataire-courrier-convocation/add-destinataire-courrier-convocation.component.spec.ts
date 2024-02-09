import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDestinataireCourrierConvocationComponent } from './add-destinataire-courrier-convocation.component';

describe('AddDestinataireCourrierComponent', () => {
  let component: AddDestinataireCourrierConvocationComponent;
  let fixture: ComponentFixture<AddDestinataireCourrierConvocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDestinataireCourrierConvocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDestinataireCourrierConvocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
