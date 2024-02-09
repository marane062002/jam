import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTypeControleComponent } from './update-type-controle.component';

describe('UpdateTypeControleComponent', () => {
  let component: UpdateTypeControleComponent;
  let fixture: ComponentFixture<UpdateTypeControleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTypeControleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTypeControleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
