import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiletteEditComponent } from './toilette-edit.component';

describe('ToiletteEditComponent', () => {
  let component: ToiletteEditComponent;
  let fixture: ComponentFixture<ToiletteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToiletteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToiletteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
