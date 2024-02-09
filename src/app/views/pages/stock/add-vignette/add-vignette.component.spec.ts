import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVignetteComponent } from './add-vignette.component';

describe('AddVignetteComponent', () => {
  let component: AddVignetteComponent;
  let fixture: ComponentFixture<AddVignetteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVignetteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVignetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
