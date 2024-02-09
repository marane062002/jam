import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReformeComponent } from './add-reforme.component';

describe('AddReformeComponent', () => {
  let component: AddReformeComponent;
  let fixture: ComponentFixture<AddReformeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReformeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
