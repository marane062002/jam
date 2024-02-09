import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestataireNewComponent } from './prestataire-new.component';

describe('PrestataireNewComponent', () => {
  let component: PrestataireNewComponent;
  let fixture: ComponentFixture<PrestataireNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestataireNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestataireNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
