import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConventionComponent } from './edit-convention.component';

describe('EditConventionComponent', () => {
  let component: EditConventionComponent;
  let fixture: ComponentFixture<EditConventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConventionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
