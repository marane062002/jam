import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditPwdComponent } from './user-edit-pwd.component';

describe('UserEditPwdComponent', () => {
  let component: UserEditPwdComponent;
  let fixture: ComponentFixture<UserEditPwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditPwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
