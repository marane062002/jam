import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSousTypeComponent } from './add-sous-type.component';

describe('AddSousTypeComponent', () => {
  let component: AddSousTypeComponent;
  let fixture: ComponentFixture<AddSousTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSousTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSousTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
