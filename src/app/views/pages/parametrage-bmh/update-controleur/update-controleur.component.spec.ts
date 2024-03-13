import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateControleurComponent } from './update-controleur.component';

describe('UpdateControleurComponent', () => {
  let component: UpdateControleurComponent;
  let fixture: ComponentFixture<UpdateControleurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateControleurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateControleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
