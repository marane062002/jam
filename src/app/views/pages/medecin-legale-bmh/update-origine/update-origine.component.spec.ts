import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrigineComponent } from './update-origine.component';

describe('UpdateOrigineComponent', () => {
  let component: UpdateOrigineComponent;
  let fixture: ComponentFixture<UpdateOrigineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateOrigineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrigineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
