import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImmobilisationComponent } from './edit-immobilisation.component';

describe('EditImmobilisationComponent', () => {
  let component: EditImmobilisationComponent;
  let fixture: ComponentFixture<EditImmobilisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditImmobilisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImmobilisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
