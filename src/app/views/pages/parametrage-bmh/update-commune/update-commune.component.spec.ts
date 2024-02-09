import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCommuneComponent } from './update-commune.component';

describe('UpdateCommuneComponent', () => {
  let component: UpdateCommuneComponent;
  let fixture: ComponentFixture<UpdateCommuneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCommuneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCommuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
