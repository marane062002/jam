import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocataireEditComponent } from './locataire-edit.component';

describe('LocataireEditComponent', () => {
  let component: LocataireEditComponent;
  let fixture: ComponentFixture<LocataireEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocataireEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocataireEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
