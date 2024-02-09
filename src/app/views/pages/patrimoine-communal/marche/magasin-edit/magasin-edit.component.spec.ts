import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagasinEditComponent } from './magasin-edit.component';

describe('MagasinEditComponent', () => {
  let component: MagasinEditComponent;
  let fixture: ComponentFixture<MagasinEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagasinEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagasinEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
