import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActivitesCommuneComponent } from './list-activites-commune.component';

describe('ListActivitesCommuneComponent', () => {
  let component: ListActivitesCommuneComponent;
  let fixture: ComponentFixture<ListActivitesCommuneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListActivitesCommuneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActivitesCommuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
