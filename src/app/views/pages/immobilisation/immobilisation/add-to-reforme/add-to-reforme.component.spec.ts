import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToReformeComponent } from './add-to-reforme.component';

describe('AddToReformeComponent', () => {
  let component: AddToReformeComponent;
  let fixture: ComponentFixture<AddToReformeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToReformeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToReformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
