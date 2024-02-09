import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabLigneloyerComponent } from './tab-ligneloyer.component';

describe('TabLigneloyerComponent', () => {
  let component: TabLigneloyerComponent;
  let fixture: ComponentFixture<TabLigneloyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabLigneloyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabLigneloyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
