import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdStructureDelegataireComponent } from './upd-structure-delegataire.component';

describe('UpdStructureDelegataireComponent', () => {
  let component: UpdStructureDelegataireComponent;
  let fixture: ComponentFixture<UpdStructureDelegataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdStructureDelegataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdStructureDelegataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
