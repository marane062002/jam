import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabHebergementComponent } from './tab-hebergement.component';

describe('TabHebergementComponent', () => {
  let component: TabHebergementComponent;
  let fixture: ComponentFixture<TabHebergementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabHebergementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabHebergementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
