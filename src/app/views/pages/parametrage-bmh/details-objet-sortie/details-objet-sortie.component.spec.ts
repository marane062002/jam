import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsObjetSortieComponent } from './details-objet-sortie.component';

describe('DetailsObjetSortieComponent', () => {
  let component: DetailsObjetSortieComponent;
  let fixture: ComponentFixture<DetailsObjetSortieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsObjetSortieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsObjetSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
