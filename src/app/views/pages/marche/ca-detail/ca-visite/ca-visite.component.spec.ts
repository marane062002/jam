import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaVisiteComponent } from './ca-visite.component';

describe('CaVisiteComponent', () => {
  let component: CaVisiteComponent;
  let fixture: ComponentFixture<CaVisiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaVisiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
