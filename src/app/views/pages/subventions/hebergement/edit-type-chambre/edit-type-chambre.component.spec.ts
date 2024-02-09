import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeChambreComponent } from './edit-type-chambre.component';

describe('EditTypeChambreComponent', () => {
  let component: EditTypeChambreComponent;
  let fixture: ComponentFixture<EditTypeChambreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTypeChambreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTypeChambreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
