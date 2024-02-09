import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVignetteComponent } from './edit-vignette.component';

describe('EditVignetteComponent', () => {
  let component: EditVignetteComponent;
  let fixture: ComponentFixture<EditVignetteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVignetteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVignetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
