import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocataireNewComponent } from './locataire-new.component';

describe('LocataireNewComponent', () => {
  let component: LocataireNewComponent;
  let fixture: ComponentFixture<LocataireNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocataireNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocataireNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
