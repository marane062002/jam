import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneloyerEditComponent } from './ligneloyer-edit.component';

describe('LigneloyerEditComponent', () => {
  let component: LigneloyerEditComponent;
  let fixture: ComponentFixture<LigneloyerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigneloyerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneloyerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
