import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFourgonComponent } from './add-fourgon.component';

describe('AddFourgonComponent', () => {
  let component: AddFourgonComponent;
  let fixture: ComponentFixture<AddFourgonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFourgonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFourgonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
