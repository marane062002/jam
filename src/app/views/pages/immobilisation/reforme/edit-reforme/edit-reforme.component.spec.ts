import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReformeComponent } from './edit-reforme.component';

describe('EditReformeComponent', () => {
  let component: EditReformeComponent;
  let fixture: ComponentFixture<EditReformeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReformeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
