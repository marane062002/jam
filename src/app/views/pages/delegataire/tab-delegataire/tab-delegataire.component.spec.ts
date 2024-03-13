import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabDelegataireComponent } from './tab-delegataire.component';

describe('TabDelegataireComponent', () => {
  let component: TabDelegataireComponent;
  let fixture: ComponentFixture<TabDelegataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabDelegataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabDelegataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
