import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiletteComponent } from './toilette.component';

describe('ToiletteComponent', () => {
  let component: ToiletteComponent;
  let fixture: ComponentFixture<ToiletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToiletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToiletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
