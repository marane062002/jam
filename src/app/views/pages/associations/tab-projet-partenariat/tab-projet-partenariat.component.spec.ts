import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabProjetPartenariatComponent } from './tab-projet-partenariat.component';

describe('TabProjetPartenariatComponent', () => {
  let component: TabProjetPartenariatComponent;
  let fixture: ComponentFixture<TabProjetPartenariatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabProjetPartenariatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabProjetPartenariatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
