import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimoineNewComponent } from './patrimoine-new.component';

describe('PatrimoineNewComponent', () => {
  let component: PatrimoineNewComponent;
  let fixture: ComponentFixture<PatrimoineNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatrimoineNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrimoineNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
