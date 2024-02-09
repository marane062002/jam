import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaragistesComponent } from './garagistes.component';

describe('GaragistesComponent', () => {
  let component: GaragistesComponent;
  let fixture: ComponentFixture<GaragistesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaragistesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaragistesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
