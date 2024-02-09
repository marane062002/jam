import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationIndexComponent } from './attestation-index.component';

describe('AttestationIndexComponent', () => {
  let component: AttestationIndexComponent;
  let fixture: ComponentFixture<AttestationIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttestationIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttestationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
