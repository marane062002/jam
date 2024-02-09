import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTypeExamenComponent } from './update-type-examen.component';

describe('UpdateTypeExamenComponent', () => {
  let component: UpdateTypeExamenComponent;
  let fixture: ComponentFixture<UpdateTypeExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTypeExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTypeExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
