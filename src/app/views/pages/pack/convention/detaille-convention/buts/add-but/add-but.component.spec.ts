import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddButComponent } from './add-but.component';

describe('AddButComponent', () => {
  let component: AddButComponent;
  let fixture: ComponentFixture<AddButComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddButComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddButComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
