import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLogistiqueComponent } from './edit-logistique.component';

describe('EditLogistiqueComponent', () => {
  let component: EditLogistiqueComponent;
  let fixture: ComponentFixture<EditLogistiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLogistiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLogistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
