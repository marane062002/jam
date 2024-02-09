import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotationShowComponent } from './notation-show.component';

describe('NotationShowComponent', () => {
  let component: NotationShowComponent;
  let fixture: ComponentFixture<NotationShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotationShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotationShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
