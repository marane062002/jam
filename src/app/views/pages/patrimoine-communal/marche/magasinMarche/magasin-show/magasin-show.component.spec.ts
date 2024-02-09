import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowMagasinComponent } from './magasin-show.component';


describe('MagasinComponent', () => {
  let component: ShowMagasinComponent;
  let fixture: ComponentFixture<ShowMagasinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMagasinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
