import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrigineCourriersSortantsComponent } from './edit-origine-courriers-sortants.component';

describe('EditOrigineCourriersSortantsComponent', () => {
  let component: EditOrigineCourriersSortantsComponent;
  let fixture: ComponentFixture<EditOrigineCourriersSortantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrigineCourriersSortantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrigineCourriersSortantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
