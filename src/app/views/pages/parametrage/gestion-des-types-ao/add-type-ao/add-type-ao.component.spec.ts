import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeAoComponent } from './add-type-ao.component';

describe('AddTypeAoComponent', () => {
  let component: AddTypeAoComponent;
  let fixture: ComponentFixture<AddTypeAoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeAoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeAoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
