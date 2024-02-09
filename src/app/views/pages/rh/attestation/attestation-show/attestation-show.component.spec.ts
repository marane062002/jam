import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationShowComponent } from './attestation-show.component';

describe('AttestationShowComponent', () => {
  let component: AttestationShowComponent;
  let fixture: ComponentFixture<AttestationShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttestationShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttestationShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
