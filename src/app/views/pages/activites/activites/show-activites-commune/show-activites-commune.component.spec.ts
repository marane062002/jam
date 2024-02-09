import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowActivitesCommuneComponent } from './show-activites-commune.component';

describe('ShowActivitesCommuneComponent', () => {
  let component: ShowActivitesCommuneComponent;
  let fixture: ComponentFixture<ShowActivitesCommuneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowActivitesCommuneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowActivitesCommuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
