import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeDeclarrationComponent } from './add-type-declarration.component';

describe('AddTypeDeclarrationComponent', () => {
  let component: AddTypeDeclarrationComponent;
  let fixture: ComponentFixture<AddTypeDeclarrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeDeclarrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeDeclarrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
