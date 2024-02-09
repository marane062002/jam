import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMorgueComponent } from './add-morgue.component';

describe('AddMorgueComponent', () => {
  let component: AddMorgueComponent;
  let fixture: ComponentFixture<AddMorgueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMorgueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMorgueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
