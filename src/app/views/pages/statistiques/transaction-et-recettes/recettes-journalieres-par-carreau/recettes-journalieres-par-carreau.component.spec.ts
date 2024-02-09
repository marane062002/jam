import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecettesJournalieresParCarreauComponent } from './recettes-journalieres-par-carreau.component';

describe('RecettesJournalieresParCarreauComponent', () => {
  let component: RecettesJournalieresParCarreauComponent;
  let fixture: ComponentFixture<RecettesJournalieresParCarreauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecettesJournalieresParCarreauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecettesJournalieresParCarreauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
