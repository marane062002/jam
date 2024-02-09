import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomaineNewComponent } from './domaine-new.component';

describe('DomaineNewComponent', () => {
  let component: DomaineNewComponent;
  let fixture: ComponentFixture<DomaineNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomaineNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomaineNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
