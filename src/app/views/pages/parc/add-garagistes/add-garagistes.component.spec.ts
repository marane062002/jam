import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGaragistesComponent } from './add-garagistes.component';

describe('AddGaragistesComponent', () => {
  let component: AddGaragistesComponent;
  let fixture: ComponentFixture<AddGaragistesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGaragistesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGaragistesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
