import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAppartementComponent } from './tab-appartement.component';

describe('TabAppartementComponent', () => {
  let component: TabAppartementComponent;
  let fixture: ComponentFixture<TabAppartementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAppartementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAppartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
