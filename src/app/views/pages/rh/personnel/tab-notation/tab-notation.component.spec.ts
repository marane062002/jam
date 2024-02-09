import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabNotationComponent } from './tab-notation.component';

describe('TabNotationComponent', () => {
  let component: TabNotationComponent;
  let fixture: ComponentFixture<TabNotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabNotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabNotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
