import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValideDgServiceComponent } from './valide-dg-service.component';

describe('ValideDgServiceComponent', () => {
  let component: ValideDgServiceComponent;
  let fixture: ComponentFixture<ValideDgServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValideDgServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValideDgServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
