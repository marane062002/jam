import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubventionsComponent } from './add-subventions.component';

describe('AddSubventionsComponent', () => {
  let component: AddSubventionsComponent;
  let fixture: ComponentFixture<AddSubventionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubventionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
