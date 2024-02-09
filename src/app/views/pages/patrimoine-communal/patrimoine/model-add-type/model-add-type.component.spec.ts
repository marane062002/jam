import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAddTypeComponent } from './model-add-type.component';

describe('ModelAddTypeComponent', () => {
  let component: ModelAddTypeComponent;
  let fixture: ComponentFixture<ModelAddTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelAddTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelAddTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
