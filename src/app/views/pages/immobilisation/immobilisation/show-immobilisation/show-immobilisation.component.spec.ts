import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowImmobilisationComponent } from './show-immobilisation.component';

describe('ShowImmobilisationComponent', () => {
  let component: ShowImmobilisationComponent;
  let fixture: ComponentFixture<ShowImmobilisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowImmobilisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowImmobilisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
