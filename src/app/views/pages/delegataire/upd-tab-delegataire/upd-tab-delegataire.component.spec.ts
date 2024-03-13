import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdTabDelegataireComponent } from './upd-tab-delegataire.component';

describe('UpdTabDelegataireComponent', () => {
  let component: UpdTabDelegataireComponent;
  let fixture: ComponentFixture<UpdTabDelegataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdTabDelegataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdTabDelegataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
