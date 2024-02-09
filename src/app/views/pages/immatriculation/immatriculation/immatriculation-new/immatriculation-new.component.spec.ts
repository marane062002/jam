import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmatriculationNewComponent } from './immatriculation-new.component';

describe('ImmatriculationNewComponent', () => {
  let component: ImmatriculationNewComponent;
  let fixture: ComponentFixture<ImmatriculationNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmatriculationNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmatriculationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
