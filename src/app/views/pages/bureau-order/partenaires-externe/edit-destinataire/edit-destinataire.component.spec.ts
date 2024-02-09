import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDestinataireComponent } from './edit-destinataire.component';

describe('EditDestinataireComponent', () => {
  let component: EditDestinataireComponent;
  let fixture: ComponentFixture<EditDestinataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDestinataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDestinataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
