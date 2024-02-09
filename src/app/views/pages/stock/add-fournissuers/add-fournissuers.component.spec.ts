import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFournissuersComponent } from './add-fournissuers.component';

describe('AddFournissuersComponent', () => {
  let component: AddFournissuersComponent;
  let fixture: ComponentFixture<AddFournissuersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFournissuersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFournissuersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
