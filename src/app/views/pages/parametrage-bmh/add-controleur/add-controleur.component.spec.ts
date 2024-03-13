import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddControleurComponent } from './add-controleur.component';

describe('AddControleurComponent', () => {
  let component: AddControleurComponent;
  let fixture: ComponentFixture<AddControleurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddControleurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddControleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
