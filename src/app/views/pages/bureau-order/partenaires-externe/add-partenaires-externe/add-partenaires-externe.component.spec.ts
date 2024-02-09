import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartenairesExterneComponent } from './add-partenaires-externe.component';

describe('AddPartenairesExterneComponent', () => {
  let component: AddPartenairesExterneComponent;
  let fixture: ComponentFixture<AddPartenairesExterneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPartenairesExterneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartenairesExterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
