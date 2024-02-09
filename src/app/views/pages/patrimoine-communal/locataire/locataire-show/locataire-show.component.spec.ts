import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocataireShowComponent } from './locataire-show.component';

describe('LocataireShowComponent', () => {
  let component: LocataireShowComponent;
  let fixture: ComponentFixture<LocataireShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocataireShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocataireShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
