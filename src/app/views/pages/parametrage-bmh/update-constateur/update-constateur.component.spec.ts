import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConstateurComponent } from './update-constateur.component';

describe('UpdateConstateurComponent', () => {
  let component: UpdateConstateurComponent;
  let fixture: ComponentFixture<UpdateConstateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateConstateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateConstateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
