import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEduteBesionComponent } from './add-edute-besion.component';

describe('AddEduteBesionComponent', () => {
  let component: AddEduteBesionComponent;
  let fixture: ComponentFixture<AddEduteBesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEduteBesionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEduteBesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
