import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcheNewComponent } from './marche-new.component';

describe('MarcheNewComponent', () => {
  let component: MarcheNewComponent;
  let fixture: ComponentFixture<MarcheNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcheNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcheNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
