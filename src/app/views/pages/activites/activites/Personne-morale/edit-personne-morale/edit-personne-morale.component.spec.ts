import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonneMoraleComponent } from './edit-personne-morale.component';

describe('EditPersonneMoraleComponent', () => {
  let component: EditPersonneMoraleComponent;
  let fixture: ComponentFixture<EditPersonneMoraleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPersonneMoraleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonneMoraleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
