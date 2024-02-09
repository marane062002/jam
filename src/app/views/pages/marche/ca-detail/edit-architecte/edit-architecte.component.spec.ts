import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArchitecteComponent } from './edit-architecte.component';

describe('EditArchitecteComponent', () => {
  let component: EditArchitecteComponent;
  let fixture: ComponentFixture<EditArchitecteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditArchitecteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArchitecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
