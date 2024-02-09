import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeAoComponent } from './edit-type-ao.component';

describe('EditTypeAoComponent', () => {
  let component: EditTypeAoComponent;
  let fixture: ComponentFixture<EditTypeAoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTypeAoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTypeAoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
