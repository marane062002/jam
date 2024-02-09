import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePrelevementComponent } from './update-prelevement.component';

describe('UpdatePrelevementComponent', () => {
  let component: UpdatePrelevementComponent;
  let fixture: ComponentFixture<UpdatePrelevementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePrelevementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePrelevementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
