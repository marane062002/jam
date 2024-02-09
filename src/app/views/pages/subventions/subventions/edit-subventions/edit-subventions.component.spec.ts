import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubventionsComponent } from './edit-subventions.component';

describe('EditSubventionsComponent', () => {
  let component: EditSubventionsComponent;
  let fixture: ComponentFixture<EditSubventionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSubventionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
