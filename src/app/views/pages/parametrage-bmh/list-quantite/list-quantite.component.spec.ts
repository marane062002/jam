import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuantiteComponent } from './list-quantite.component';

describe('ListQuantiteComponent', () => {
  let component: ListQuantiteComponent;
  let fixture: ComponentFixture<ListQuantiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListQuantiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQuantiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
