import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValideDgsComponent } from './valide-dgs.component';

describe('ValideDgsComponent', () => {
  let component: ValideDgsComponent;
  let fixture: ComponentFixture<ValideDgsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValideDgsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValideDgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
