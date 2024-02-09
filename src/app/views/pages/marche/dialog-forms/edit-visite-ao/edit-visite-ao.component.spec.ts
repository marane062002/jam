import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVisiteAoComponent } from './edit-visite-ao.component';

describe('EditVisiteAoComponent', () => {
  let component: EditVisiteAoComponent;
  let fixture: ComponentFixture<EditVisiteAoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVisiteAoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVisiteAoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
