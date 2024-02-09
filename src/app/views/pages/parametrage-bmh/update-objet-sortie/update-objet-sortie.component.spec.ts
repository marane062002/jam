import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateObjetSortieComponent } from './update-objet-sortie.component';

describe('UpdateObjetSortieComponent', () => {
  let component: UpdateObjetSortieComponent;
  let fixture: ComponentFixture<UpdateObjetSortieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateObjetSortieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateObjetSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
