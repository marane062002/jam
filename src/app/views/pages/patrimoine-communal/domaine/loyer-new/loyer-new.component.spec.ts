import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyerNewComponent } from './loyer-new.component';

describe('LoyerNewComponent', () => {
  let component: LoyerNewComponent;
  let fixture: ComponentFixture<LoyerNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyerNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyerNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
