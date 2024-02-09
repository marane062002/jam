import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionPartsComponent } from './gestion-des-parts.component';



describe('GestionPartsComponent', () => {
  let component: GestionPartsComponent;
  let fixture: ComponentFixture<GestionPartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionPartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
