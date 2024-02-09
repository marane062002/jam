import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObjetSortieComponent } from './add-objet-sortie.component';

describe('AddObjetSortieComponent', () => {
  let component: AddObjetSortieComponent;
  let fixture: ComponentFixture<AddObjetSortieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddObjetSortieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddObjetSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
