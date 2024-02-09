import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLogistiqueComponent } from './add-logistique.component';

describe('AddLogistiqueComponent', () => {
  let component: AddLogistiqueComponent;
  let fixture: ComponentFixture<AddLogistiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLogistiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLogistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
