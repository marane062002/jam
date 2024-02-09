import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneloyerNewComponent } from './ligneloyer-new.component';

describe('LigneloyerNewComponent', () => {
  let component: LigneloyerNewComponent;
  let fixture: ComponentFixture<LigneloyerNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigneloyerNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneloyerNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
