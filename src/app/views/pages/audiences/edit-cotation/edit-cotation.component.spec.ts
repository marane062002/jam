import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCotationComponent } from './edit-cotation.component';

describe('EditCotationComponent', () => {
  let component: EditCotationComponent;
  let fixture: ComponentFixture<EditCotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
