import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSdlComponent } from './tab-sdl.component';

describe('TabSdlComponent', () => {
  let component: TabSdlComponent;
  let fixture: ComponentFixture<TabSdlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabSdlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
