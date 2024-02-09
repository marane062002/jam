import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPjCommentaireComponent } from './show-pj-commentaire.component';

describe('ShowPjCommentaireComponent', () => {
  let component: ShowPjCommentaireComponent;
  let fixture: ComponentFixture<ShowPjCommentaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPjCommentaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPjCommentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
