import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeValidateComponent } from './conge-validate.component';

describe('CongeValidateComponent', () => {
  let component: CongeValidateComponent;
  let fixture: ComponentFixture<CongeValidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongeValidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
