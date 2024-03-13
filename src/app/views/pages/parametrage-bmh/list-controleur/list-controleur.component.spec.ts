import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListControleurComponent } from './list-controleur.component';

describe('ListControleurComponent', () => {
  let component: ListControleurComponent;
  let fixture: ComponentFixture<ListControleurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListControleurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListControleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
