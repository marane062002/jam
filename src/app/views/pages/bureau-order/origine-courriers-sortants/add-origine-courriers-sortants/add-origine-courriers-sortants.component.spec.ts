import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrigineCourriersSortantsComponent } from './add-origine-courriers-sortants.component';

describe('AddOrigineCourriersSortantsComponent', () => {
  let component: AddOrigineCourriersSortantsComponent;
  let fixture: ComponentFixture<AddOrigineCourriersSortantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrigineCourriersSortantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrigineCourriersSortantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
