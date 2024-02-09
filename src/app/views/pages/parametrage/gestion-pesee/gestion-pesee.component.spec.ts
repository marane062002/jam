import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionPeseeComponent } from './gestion-pesee.component';



describe('GestionPeseeComponent', () => {
  let component: GestionPeseeComponent;
  let fixture: ComponentFixture<GestionPeseeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionPeseeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPeseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
