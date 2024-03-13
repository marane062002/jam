import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowThemeComponent } from './show-theme.component';

describe('ShowThemeComponent', () => {
  let component: ShowThemeComponent;
  let fixture: ComponentFixture<ShowThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
