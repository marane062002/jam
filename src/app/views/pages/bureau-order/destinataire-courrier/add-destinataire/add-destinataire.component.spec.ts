import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDestinataireComponent } from './add-destinataire.component';

describe('AddDestinataireComponent', () => {
  let component: AddDestinataireComponent;
  let fixture: ComponentFixture<AddDestinataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDestinataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDestinataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
