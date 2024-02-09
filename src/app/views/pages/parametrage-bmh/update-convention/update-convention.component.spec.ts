import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConventionComponent } from './update-convention.component';

describe('UpdateConventionComponent', () => {
  let component: UpdateConventionComponent;
  let fixture: ComponentFixture<UpdateConventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateConventionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
