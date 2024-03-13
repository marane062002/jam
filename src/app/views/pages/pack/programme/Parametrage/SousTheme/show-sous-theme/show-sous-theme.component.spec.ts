import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSousThemeComponent } from './show-sous-theme.component';

describe('ShowSousThemeComponent', () => {
  let component: ShowSousThemeComponent;
  let fixture: ComponentFixture<ShowSousThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSousThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSousThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
