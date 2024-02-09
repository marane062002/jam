import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompagneNewComponent } from './compagne-new.component';

describe('CompagneNewComponent', () => {
  let component: CompagneNewComponent;
  let fixture: ComponentFixture<CompagneNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompagneNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompagneNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
