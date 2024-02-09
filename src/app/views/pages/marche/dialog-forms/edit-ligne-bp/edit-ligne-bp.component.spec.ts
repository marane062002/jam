import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLigneBpComponent } from './edit-ligne-bp.component';

describe('EditLigneBpComponent', () => {
  let component: EditLigneBpComponent;
  let fixture: ComponentFixture<EditLigneBpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLigneBpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLigneBpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
