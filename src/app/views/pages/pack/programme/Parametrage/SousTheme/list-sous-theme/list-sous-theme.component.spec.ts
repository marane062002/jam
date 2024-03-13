import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSousThemeComponent } from './list-sous-theme.component';

describe('ListSousThemeComponent', () => {
  let component: ListSousThemeComponent;
  let fixture: ComponentFixture<ListSousThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSousThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSousThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
