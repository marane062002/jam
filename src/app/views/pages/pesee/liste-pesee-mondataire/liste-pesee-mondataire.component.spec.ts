import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePeseeMondataireComponent } from './liste-pesee-mondataire.component';

describe('ListePeseeMondataireComponent', () => {
  let component: ListePeseeMondataireComponent;
  let fixture: ComponentFixture<ListePeseeMondataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListePeseeMondataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListePeseeMondataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
