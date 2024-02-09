import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConducteurComponent } from './add-conducteur.component';

describe('AddConducteurComponent', () => {
  let component: AddConducteurComponent;
  let fixture: ComponentFixture<AddConducteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConducteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
