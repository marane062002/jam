import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTabDelegataireComponent } from './add-tab-delegataire.component';

describe('AddTabDelegataireComponent', () => {
  let component: AddTabDelegataireComponent;
  let fixture: ComponentFixture<AddTabDelegataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTabDelegataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTabDelegataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
