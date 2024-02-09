import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAgrementAoComponent } from './edit-agrement-ao.component';

describe('EditLotAoComponent', () => {
  let component: EditAgrementAoComponent;
  let fixture: ComponentFixture<EditAgrementAoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAgrementAoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAgrementAoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
