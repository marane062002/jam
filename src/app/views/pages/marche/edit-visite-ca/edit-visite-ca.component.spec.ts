import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVisiteCaComponent } from './edit-visite-ca.component';

describe('EditVisiteCaComponent', () => {
  let component: EditVisiteCaComponent;
  let fixture: ComponentFixture<EditVisiteCaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVisiteCaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVisiteCaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
