import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvanceNewComponent } from './avance-new.component';

describe('AvanceNewComponent', () => {
  let component: AvanceNewComponent;
  let fixture: ComponentFixture<AvanceNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvanceNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvanceNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
