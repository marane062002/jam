import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSousEspeceComponent } from './edit-sous-espece.component';

describe('EditSousEspeceComponent', () => {
  let component: EditSousEspeceComponent;
  let fixture: ComponentFixture<EditSousEspeceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSousEspeceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSousEspeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
