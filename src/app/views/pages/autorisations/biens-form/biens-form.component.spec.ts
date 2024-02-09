import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiensFormComponent } from './biens-form.component';

describe('BiensFormComponent', () => {
  let component: BiensFormComponent;
  let fixture: ComponentFixture<BiensFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiensFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiensFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
