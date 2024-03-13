import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDelegataireComponent } from './edit-delegataire.component';

describe('EditDelegataireComponent', () => {
  let component: EditDelegataireComponent;
  let fixture: ComponentFixture<EditDelegataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDelegataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDelegataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
