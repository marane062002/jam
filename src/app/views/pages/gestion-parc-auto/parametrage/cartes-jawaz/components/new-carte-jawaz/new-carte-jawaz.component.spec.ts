import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCarteJawazComponent } from './new-carte-jawaz.component';

describe('NewCarteJawazComponent', () => {
  let component: NewCarteJawazComponent;
  let fixture: ComponentFixture<NewCarteJawazComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCarteJawazComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCarteJawazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
