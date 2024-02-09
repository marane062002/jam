import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiletteNewComponent } from './toilette-new.component';

describe('ToiletteNewComponent', () => {
  let component: ToiletteNewComponent;
  let fixture: ComponentFixture<ToiletteNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToiletteNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToiletteNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
