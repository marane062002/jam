import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeMarcheComponent } from './edit-type-marche.component';

describe('EditTypeMarcheComponent', () => {
  let component: EditTypeMarcheComponent;
  let fixture: ComponentFixture<EditTypeMarcheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTypeMarcheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTypeMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
