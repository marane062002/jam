import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProjetPartenariatComponent } from './show-projet-partenariat.component';

describe('ShowProjetPartenariatComponent', () => {
  let component: ShowProjetPartenariatComponent;
  let fixture: ComponentFixture<ShowProjetPartenariatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProjetPartenariatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProjetPartenariatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
