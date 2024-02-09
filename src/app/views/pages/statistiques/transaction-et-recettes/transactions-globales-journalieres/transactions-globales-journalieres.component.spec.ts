import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsGlobalesJournalieresComponent } from './transactions-globales-journalieres.component';

describe('TransactionsGlobalesJournalieresComponent', () => {
  let component: TransactionsGlobalesJournalieresComponent;
  let fixture: ComponentFixture<TransactionsGlobalesJournalieresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsGlobalesJournalieresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsGlobalesJournalieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
