import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsControleurComponent } from './details-controleur.component';

describe('DetailsControleurComponent', () => {
  let component: DetailsControleurComponent;
  let fixture: ComponentFixture<DetailsControleurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsControleurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsControleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
