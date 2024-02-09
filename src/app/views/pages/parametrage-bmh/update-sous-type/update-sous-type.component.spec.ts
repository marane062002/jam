import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSousTypeComponent } from './update-sous-type.component';

describe('UpdateSousTypeComponent', () => {
  let component: UpdateSousTypeComponent;
  let fixture: ComponentFixture<UpdateSousTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSousTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSousTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
