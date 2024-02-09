import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetPartenariatComponent } from './projet-partenariat.component';

describe('ProjetPartenariatComponent', () => {
  let component: ProjetPartenariatComponent;
  let fixture: ComponentFixture<ProjetPartenariatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetPartenariatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetPartenariatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
