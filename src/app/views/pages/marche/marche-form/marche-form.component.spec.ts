import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcheFormComponent } from './marche-form.component';

describe('MarcheFormComponent', () => {
  let component: MarcheFormComponent;
  let fixture: ComponentFixture<MarcheFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcheFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcheFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
