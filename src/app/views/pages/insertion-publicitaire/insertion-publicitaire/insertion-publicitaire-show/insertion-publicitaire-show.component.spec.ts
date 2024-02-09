import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionPublicitaireShowComponent } from './insertion-publicitaire-show.component';

describe('InsertionPublicitaireShowComponent', () => {
  let component: InsertionPublicitaireShowComponent;
  let fixture: ComponentFixture<InsertionPublicitaireShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertionPublicitaireShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertionPublicitaireShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
