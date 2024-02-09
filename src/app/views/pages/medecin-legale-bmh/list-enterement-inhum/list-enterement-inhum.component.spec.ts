import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnterementInhumComponent } from './list-enterement-inhum.component';

describe('ListEnterementInhumComponent', () => {
  let component: ListEnterementInhumComponent;
  let fixture: ComponentFixture<ListEnterementInhumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEnterementInhumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEnterementInhumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
