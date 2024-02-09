import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPeseeComponent } from './edit-pesee.component';

describe('EditPeseeComponent', () => {
  let component: EditPeseeComponent;
  let fixture: ComponentFixture<EditPeseeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPeseeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPeseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
