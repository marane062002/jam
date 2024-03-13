import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdDelegataireComponent } from './upd-delegataire.component';

describe('UpdDelegataireComponent', () => {
  let component: UpdDelegataireComponent;
  let fixture: ComponentFixture<UpdDelegataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdDelegataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdDelegataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
