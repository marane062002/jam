import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConstateurComponent } from './add-constateur.component';

describe('AddConstateurComponent', () => {
  let component: AddConstateurComponent;
  let fixture: ComponentFixture<AddConstateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConstateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConstateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
