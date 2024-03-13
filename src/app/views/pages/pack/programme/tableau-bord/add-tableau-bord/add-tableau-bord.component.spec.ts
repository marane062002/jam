import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTableauBordComponent } from './add-tableau-bord.component';

describe('AddTableauBordComponent', () => {
  let component: AddTableauBordComponent;
  let fixture: ComponentFixture<AddTableauBordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTableauBordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTableauBordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
