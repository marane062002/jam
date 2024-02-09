import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeExamenComponent } from './add-type-examen.component';

describe('AddTypeExamenComponent', () => {
  let component: AddTypeExamenComponent;
  let fixture: ComponentFixture<AddTypeExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
