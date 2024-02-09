import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProjetUrbanismeComponent } from './show-projet-urbanisme.component';

describe('ShowProjetUrbanismeComponent', () => {
  let component: ShowProjetUrbanismeComponent;
  let fixture: ComponentFixture<ShowProjetUrbanismeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProjetUrbanismeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProjetUrbanismeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
