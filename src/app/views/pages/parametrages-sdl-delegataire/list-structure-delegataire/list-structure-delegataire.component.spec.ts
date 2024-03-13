import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStructureDelegataireComponent } from './list-structure-delegataire.component';

describe('ListStructureDelegataireComponent', () => {
  let component: ListStructureDelegataireComponent;
  let fixture: ComponentFixture<ListStructureDelegataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStructureDelegataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStructureDelegataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
