import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDestinataireCourrierComponent } from './add-destinataire-courrier.component';

describe('AddDestinataireCourrierComponent', () => {
  let component: AddDestinataireCourrierComponent;
  let fixture: ComponentFixture<AddDestinataireCourrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDestinataireCourrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDestinataireCourrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
