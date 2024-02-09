import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChevillardComponent } from './edit-chevillard.component';

describe('EditChevillardComponent', () => {
  let component: EditChevillardComponent;
  let fixture: ComponentFixture<EditChevillardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditChevillardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChevillardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
