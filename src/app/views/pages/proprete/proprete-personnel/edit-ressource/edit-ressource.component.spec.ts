import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRessourceComponent } from './edit-ressource.component';

describe('EditRessourceComponent', () => {
  let component: EditRessourceComponent;
  let fixture: ComponentFixture<EditRessourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRessourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
