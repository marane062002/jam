import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjetUrbanismeComponent } from './edit-projet-urbanisme.component';

describe('EditProjetUrbanismeComponent', () => {
  let component: EditProjetUrbanismeComponent;
  let fixture: ComponentFixture<EditProjetUrbanismeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjetUrbanismeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjetUrbanismeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
