import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjetPartenariatComponent } from './add-projet-partenariat.component';

describe('AddProjetPartenariatComponent', () => {
  let component: AddProjetPartenariatComponent;
  let fixture: ComponentFixture<AddProjetPartenariatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjetPartenariatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjetPartenariatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
