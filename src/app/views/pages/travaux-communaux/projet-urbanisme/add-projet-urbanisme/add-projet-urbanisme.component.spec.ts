import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjetUrbanismeComponent } from './add-projet-urbanisme.component';

describe('AddProjetUrbanismeComponent', () => {
  let component: AddProjetUrbanismeComponent;
  let fixture: ComponentFixture<AddProjetUrbanismeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjetUrbanismeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjetUrbanismeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
