import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvmlocationShowComponent } from './mvmlocation-show.component';

describe('MvmlocationShowComponent', () => {
  let component: MvmlocationShowComponent;
  let fixture: ComponentFixture<MvmlocationShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvmlocationShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvmlocationShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
