import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCentreComponent } from './add-centre.component';

describe('AddCentreComponent', () => {
  let component: AddCentreComponent;
  let fixture: ComponentFixture<AddCentreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCentreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
