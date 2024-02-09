import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MondatEditComponent } from './mondat-edit.component';

describe('MondatEditComponent', () => {
  let component: MondatEditComponent;
  let fixture: ComponentFixture<MondatEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MondatEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MondatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
