import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiletteShowComponent } from './toilette-show.component';

describe('ToiletteShowComponent', () => {
  let component: ToiletteShowComponent;
  let fixture: ComponentFixture<ToiletteShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToiletteShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToiletteShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
