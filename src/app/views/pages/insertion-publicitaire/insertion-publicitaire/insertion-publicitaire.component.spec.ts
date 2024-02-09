import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionPublicitaireComponent } from './insertion-publicitaire.component';

describe('InsertionPublicitaireComponent', () => {
  let component: InsertionPublicitaireComponent;
  let fixture: ComponentFixture<InsertionPublicitaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertionPublicitaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertionPublicitaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
