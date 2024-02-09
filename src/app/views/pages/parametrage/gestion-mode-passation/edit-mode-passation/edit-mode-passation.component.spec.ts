import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModePassationComponent } from './edit-mode-passation.component';

describe('EditModePassationComponent', () => {
  let component: EditModePassationComponent;
  let fixture: ComponentFixture<EditModePassationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditModePassationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModePassationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
