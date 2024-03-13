import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegroupementComponent } from './edit-regroupement.component';

describe('EditRegroupementComponent', () => {
  let component: EditRegroupementComponent;
  let fixture: ComponentFixture<EditRegroupementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRegroupementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRegroupementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
