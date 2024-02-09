import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImmobilisationComponent } from './add-immobilisation.component';

describe('AddImmobilisationComponent', () => {
  let component: AddImmobilisationComponent;
  let fixture: ComponentFixture<AddImmobilisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImmobilisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImmobilisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
