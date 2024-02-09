import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCadavreComponent } from './add-cadavre.component';

describe('AddCadavreComponent', () => {
  let component: AddCadavreComponent;
  let fixture: ComponentFixture<AddCadavreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCadavreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCadavreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
