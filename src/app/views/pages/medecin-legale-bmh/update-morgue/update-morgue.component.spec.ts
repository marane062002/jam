import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMorgueComponent } from './update-morgue.component';

describe('UpdateMorgueComponent', () => {
  let component: UpdateMorgueComponent;
  let fixture: ComponentFixture<UpdateMorgueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMorgueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMorgueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
