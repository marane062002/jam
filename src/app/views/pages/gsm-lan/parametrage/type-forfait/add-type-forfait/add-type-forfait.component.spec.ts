import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeForfaitComponent } from './add-type-forfait.component';

describe('AddTypeForfaitComponent', () => {
  let component: AddTypeForfaitComponent;
  let fixture: ComponentFixture<AddTypeForfaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeForfaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeForfaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
