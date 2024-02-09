import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntreComponent } from './add-entre.component';

describe('AddEntreComponent', () => {
  let component: AddEntreComponent;
  let fixture: ComponentFixture<AddEntreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
