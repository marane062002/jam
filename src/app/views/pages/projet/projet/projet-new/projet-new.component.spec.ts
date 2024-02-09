import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetNewComponent } from './projet-new.component';

describe('ProjetNewComponent', () => {
  let component: ProjetNewComponent;
  let fixture: ComponentFixture<ProjetNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
