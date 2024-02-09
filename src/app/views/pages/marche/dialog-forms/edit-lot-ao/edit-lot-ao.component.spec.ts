import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLotAoComponent } from './edit-lot-ao.component';

describe('EditLotAoComponent', () => {
  let component: EditLotAoComponent;
  let fixture: ComponentFixture<EditLotAoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLotAoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLotAoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
