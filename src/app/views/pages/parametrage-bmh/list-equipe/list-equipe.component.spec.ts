import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEquipeComponent } from './list-equipe.component';

describe('ListEquipeComponent', () => {
  let component: ListEquipeComponent;
  let fixture: ComponentFixture<ListEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
