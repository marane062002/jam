import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnterementInhumComponent } from './add-enterement-inhum.component';

describe('AddEnterementInhumComponent', () => {
  let component: AddEnterementInhumComponent;
  let fixture: ComponentFixture<AddEnterementInhumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEnterementInhumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEnterementInhumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
