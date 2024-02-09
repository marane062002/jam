import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActivitesCommuneComponent } from './edit-activites-commune.component';

describe('EditActivitesCommuneComponent', () => {
  let component: EditActivitesCommuneComponent;
  let fixture: ComponentFixture<EditActivitesCommuneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditActivitesCommuneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActivitesCommuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
