import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeNewComponent } from './conge-new.component';

describe('CongeNewComponent', () => {
  let component: CongeNewComponent;
  let fixture: ComponentFixture<CongeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
