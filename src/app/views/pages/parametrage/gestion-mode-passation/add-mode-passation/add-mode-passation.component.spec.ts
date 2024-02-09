import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModePassationComponent } from './add-mode-passation.component';

describe('AddModePassationComponent', () => {
  let component: AddModePassationComponent;
  let fixture: ComponentFixture<AddModePassationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddModePassationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModePassationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
