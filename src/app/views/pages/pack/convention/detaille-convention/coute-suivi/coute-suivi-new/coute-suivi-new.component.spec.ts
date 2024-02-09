import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouteSuiviNewComponent } from './coute-suivi-new.component';

describe('CouteSuiviNewComponent', () => {
  let component: CouteSuiviNewComponent;
  let fixture: ComponentFixture<CouteSuiviNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouteSuiviNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouteSuiviNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
