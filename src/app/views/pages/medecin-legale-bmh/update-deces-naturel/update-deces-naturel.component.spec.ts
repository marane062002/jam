import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDecesNaturelComponent } from './update-deces-naturel.component';

describe('UpdateDecesNaturelComponent', () => {
  let component: UpdateDecesNaturelComponent;
  let fixture: ComponentFixture<UpdateDecesNaturelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDecesNaturelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDecesNaturelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
