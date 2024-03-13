import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTableauBordComponent } from './list-tableau-bord.component';

describe('ListTableauBordComponent', () => {
  let component: ListTableauBordComponent;
  let fixture: ComponentFixture<ListTableauBordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTableauBordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTableauBordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
