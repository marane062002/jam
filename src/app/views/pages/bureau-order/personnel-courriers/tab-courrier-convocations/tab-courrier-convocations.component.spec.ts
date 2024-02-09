import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCourrierConvocationsComponent } from './tab-courrier-convocations.component';

describe('TabCourrierConvocationsComponent', () => {
  let component: TabCourrierConvocationsComponent;
  let fixture: ComponentFixture<TabCourrierConvocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCourrierConvocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCourrierConvocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
