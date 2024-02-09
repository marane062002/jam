import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEnterementInhumComponent } from './update-enterement-inhum.component';

describe('UpdateEnterementInhumComponent', () => {
  let component: UpdateEnterementInhumComponent;
  let fixture: ComponentFixture<UpdateEnterementInhumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEnterementInhumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEnterementInhumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
