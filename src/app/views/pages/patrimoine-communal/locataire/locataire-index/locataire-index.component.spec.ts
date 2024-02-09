import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocataireIndexComponent } from './locataire-index.component';

describe('LocataireIndexComponent', () => {
  let component: LocataireIndexComponent;
  let fixture: ComponentFixture<LocataireIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocataireIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocataireIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
