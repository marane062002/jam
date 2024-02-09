import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcheEditComponent } from './marche-edit.component';

describe('MarcheEditComponent', () => {
  let component: MarcheEditComponent;
  let fixture: ComponentFixture<MarcheEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcheEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcheEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
