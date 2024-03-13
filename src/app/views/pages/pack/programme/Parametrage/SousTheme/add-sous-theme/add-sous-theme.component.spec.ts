import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSousThemeComponent } from './add-sous-theme.component';

describe('AddSousThemeComponent', () => {
  let component: AddSousThemeComponent;
  let fixture: ComponentFixture<AddSousThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSousThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSousThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
