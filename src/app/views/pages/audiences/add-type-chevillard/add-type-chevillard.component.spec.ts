import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";
import { AddTypeChevillardComponent } from './add-type-chevillard.component';

describe('AddTypeChevillardComponent', () => {
  let component: AddTypeChevillardComponent;
  let fixture: ComponentFixture<AddTypeChevillardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeChevillardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeChevillardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
