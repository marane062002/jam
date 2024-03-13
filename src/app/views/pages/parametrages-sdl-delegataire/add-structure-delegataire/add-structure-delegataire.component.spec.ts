import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStructureDelegataireComponent } from './add-structure-delegataire.component';

describe('AddStructureDelegataireComponent', () => {
  let component: AddStructureDelegataireComponent;
  let fixture: ComponentFixture<AddStructureDelegataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStructureDelegataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStructureDelegataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
