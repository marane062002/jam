import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEsComponent } from './dialog-es.component';

describe('DialogEsComponent', () => {
  let component: DialogEsComponent;
  let fixture: ComponentFixture<DialogEsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
