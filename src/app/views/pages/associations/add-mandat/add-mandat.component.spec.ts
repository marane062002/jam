import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMandatComponent } from './add-mandat.component';

describe('AddMandatComponent', () => {
  let component: AddMandatComponent;
  let fixture: ComponentFixture<AddMandatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMandatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMandatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
