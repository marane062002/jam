import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationValidateComponent } from './attestation-validate.component';

describe('AttestationValidateComponent', () => {
  let component: AttestationValidateComponent;
  let fixture: ComponentFixture<AttestationValidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttestationValidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttestationValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
