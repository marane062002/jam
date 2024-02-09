import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAgrementComponent } from './edit-agrement.component';

describe('EditAgrementComponent', () => {
  let component: EditAgrementComponent;
  let fixture: ComponentFixture<EditAgrementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAgrementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAgrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
