import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AoEchantillonComponent } from './ao-echantillon.component';

describe('AoEchantillonComponent', () => {
  let component: AoEchantillonComponent;
  let fixture: ComponentFixture<AoEchantillonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AoEchantillonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AoEchantillonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
