import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourriersSortantsComponent } from './edit-courriers-sortants.component';

describe('EditCourriersSortantsComponent', () => {
  let component: EditCourriersSortantsComponent;
  let fixture: ComponentFixture<EditCourriersSortantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCourriersSortantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourriersSortantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
