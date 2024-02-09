import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogistiqueComponent } from './logistique.component';

describe('LogistiqueComponent', () => {
  let component: LogistiqueComponent;
  let fixture: ComponentFixture<LogistiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogistiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
