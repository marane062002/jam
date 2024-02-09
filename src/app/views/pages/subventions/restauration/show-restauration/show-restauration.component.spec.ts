import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRestaurationComponent } from './show-restauration.component';

describe('ShowRestaurationComponent', () => {
  let component: ShowRestaurationComponent;
  let fixture: ComponentFixture<ShowRestaurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRestaurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRestaurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
