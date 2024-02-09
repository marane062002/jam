import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjetUrbanismeComponent } from './list-projet-urbanisme.component';

describe('ListProjetUrbanismeComponent', () => {
  let component: ListProjetUrbanismeComponent;
  let fixture: ComponentFixture<ListProjetUrbanismeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProjetUrbanismeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjetUrbanismeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
