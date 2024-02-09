import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanenceNewComponent } from './permanence-new.component';

describe('PermanenceNewComponent', () => {
  let component: PermanenceNewComponent;
  let fixture: ComponentFixture<PermanenceNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanenceNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanenceNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
