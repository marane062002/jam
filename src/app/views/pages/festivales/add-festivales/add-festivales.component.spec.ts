import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFestivalesComponent } from './add-festivales.component';

describe('AddFestivalesComponent', () => {
  let component: AddFestivalesComponent;
  let fixture: ComponentFixture<AddFestivalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFestivalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFestivalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
