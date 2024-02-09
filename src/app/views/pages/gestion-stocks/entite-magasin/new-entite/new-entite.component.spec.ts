import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEntiteComponent } from './new-entite.component';

describe('NewEntiteComponent', () => {
  let component: NewEntiteComponent;
  let fixture: ComponentFixture<NewEntiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEntiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEntiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
