import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MondatFormComponent } from './mondat-form.component';

describe('MondatFormComponent', () => {
  let component: MondatFormComponent;
  let fixture: ComponentFixture<MondatFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MondatFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MondatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
