import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCourrierRefuseComponent } from './tab-courrier-refuse.component';

describe('TabCourrierRefuseComponent', () => {
  let component: TabCourrierRefuseComponent;
  let fixture: ComponentFixture<TabCourrierRefuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCourrierRefuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCourrierRefuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
