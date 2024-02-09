import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarteJawazComponent } from './add-carte-jawaz.component';

describe('AddCarteJawazComponent', () => {
  let component: AddCarteJawazComponent;
  let fixture: ComponentFixture<AddCarteJawazComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCarteJawazComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarteJawazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
