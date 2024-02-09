import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvmlocationNewComponent } from './mvmlocation-new.component';

describe('MvmlocationNewComponent', () => {
  let component: MvmlocationNewComponent;
  let fixture: ComponentFixture<MvmlocationNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvmlocationNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvmlocationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
