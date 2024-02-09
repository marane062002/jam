import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeControleComponent } from './add-type-controle.component';

describe('AddTypeControleComponent', () => {
  let component: AddTypeControleComponent;
  let fixture: ComponentFixture<AddTypeControleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeControleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeControleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
