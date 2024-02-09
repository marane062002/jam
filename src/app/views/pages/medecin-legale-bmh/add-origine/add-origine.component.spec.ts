import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrigineComponent } from './add-origine.component';

describe('AddOrigineComponent', () => {
  let component: AddOrigineComponent;
  let fixture: ComponentFixture<AddOrigineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrigineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrigineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
