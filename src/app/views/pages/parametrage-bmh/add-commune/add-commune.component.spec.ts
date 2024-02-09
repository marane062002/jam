import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommuneComponent } from './add-commune.component';

describe('AddCommuneComponent', () => {
  let component: AddCommuneComponent;
  let fixture: ComponentFixture<AddCommuneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCommuneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
