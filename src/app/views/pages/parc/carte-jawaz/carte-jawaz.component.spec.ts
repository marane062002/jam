import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteJawazComponent } from './carte-jawaz.component';

describe('CarteJawazComponent', () => {
  let component: CarteJawazComponent;
  let fixture: ComponentFixture<CarteJawazComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteJawazComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteJawazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
