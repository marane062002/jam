import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseNewComponent } from './phase-new.component';

describe('PhaseNewComponent', () => {
  let component: PhaseNewComponent;
  let fixture: ComponentFixture<PhaseNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
