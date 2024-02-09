import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeChambreComponent } from './add-type-chambre.component';

describe('AddTypeChambreComponent', () => {
  let component: AddTypeChambreComponent;
  let fixture: ComponentFixture<AddTypeChambreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeChambreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeChambreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
