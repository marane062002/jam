import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTarifsComponent } from './add-tarifs.component';

describe('AddTarifsComponent', () => {
  let component: AddTarifsComponent;
  let fixture: ComponentFixture<AddTarifsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTarifsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTarifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
