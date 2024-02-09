import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMagasinComponent } from './add-magasin.component';

describe('AddMagasinComponent', () => {
  let component: AddMagasinComponent;
  let fixture: ComponentFixture<AddMagasinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMagasinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
