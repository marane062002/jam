import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannedImageComponent } from './scanned-image.component';

describe('ScannedImageComponent', () => {
  let component: ScannedImageComponent;
  let fixture: ComponentFixture<ScannedImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannedImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
