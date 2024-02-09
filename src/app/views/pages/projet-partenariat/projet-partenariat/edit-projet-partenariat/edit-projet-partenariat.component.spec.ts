import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjetPartenariatComponent } from './edit-projet-partenariat.component';

describe('EditProjetPartenariatComponent', () => {
  let component: EditProjetPartenariatComponent;
  let fixture: ComponentFixture<EditProjetPartenariatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjetPartenariatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjetPartenariatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
