import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneloyerShowComponent } from './ligneloyer-show.component';

describe('LigneloyerShowComponent', () => {
  let component: LigneloyerShowComponent;
  let fixture: ComponentFixture<LigneloyerShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigneloyerShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneloyerShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
