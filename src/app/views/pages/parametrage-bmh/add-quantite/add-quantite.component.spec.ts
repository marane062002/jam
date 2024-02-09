import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuantiteComponent } from './add-quantite.component';

describe('AddQuantiteComponent', () => {
  let component: AddQuantiteComponent;
  let fixture: ComponentFixture<AddQuantiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuantiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuantiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
