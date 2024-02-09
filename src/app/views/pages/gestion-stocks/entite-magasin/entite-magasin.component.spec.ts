import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntiteMagasinComponent } from './entite-magasin.component';

describe('EntiteMagasinComponent', () => {
  let component: EntiteMagasinComponent;
  let fixture: ComponentFixture<EntiteMagasinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntiteMagasinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntiteMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
