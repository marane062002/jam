import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AoFormComponent } from './ao-form.component';

describe('AoFormComponent', () => {
  let component: AoFormComponent;
  let fixture: ComponentFixture<AoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
