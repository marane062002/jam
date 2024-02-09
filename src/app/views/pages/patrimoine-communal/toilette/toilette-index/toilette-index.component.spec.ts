import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiletteIndexComponent } from './toilette-index.component';

describe('ToiletteIndexComponent', () => {
  let component: ToiletteIndexComponent;
  let fixture: ComponentFixture<ToiletteIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToiletteIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToiletteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
