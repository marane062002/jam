import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuartierComponent } from './list-quartier.component';

describe('ListQuartierComponent', () => {
  let component: ListQuartierComponent;
  let fixture: ComponentFixture<ListQuartierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListQuartierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQuartierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
