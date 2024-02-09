import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationNewComponent } from './attestation-new.component';

describe('AttestationNewComponent', () => {
  let component: AttestationNewComponent;
  let fixture: ComponentFixture<AttestationNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttestationNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttestationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
