import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEnterementInhumComponent } from './details-enterement-inhum.component';

describe('DetailsEnterementInhumComponent', () => {
  let component: DetailsEnterementInhumComponent;
  let fixture: ComponentFixture<DetailsEnterementInhumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsEnterementInhumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEnterementInhumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
