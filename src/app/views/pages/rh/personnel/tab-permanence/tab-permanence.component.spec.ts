import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPermanenceComponent } from './tab-permanence.component';

describe('TabPermanenceComponent', () => {
  let component: TabPermanenceComponent;
  let fixture: ComponentFixture<TabPermanenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabPermanenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPermanenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
