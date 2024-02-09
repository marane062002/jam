import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmatriculationEditComponent } from './immatriculation-edit.component';

describe('ImmatriculationEditComponent', () => {
  let component: ImmatriculationEditComponent;
  let fixture: ComponentFixture<ImmatriculationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmatriculationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmatriculationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
