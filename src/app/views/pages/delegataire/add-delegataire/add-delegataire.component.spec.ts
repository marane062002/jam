import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDelegataireComponent } from './add-delegataire.component';

describe('AddDelegataireComponent', () => {
  let component: AddDelegataireComponent;
  let fixture: ComponentFixture<AddDelegataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDelegataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDelegataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
