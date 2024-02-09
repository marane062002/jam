import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowSeanceComponent } from './seance-show.component';


describe('SeanceComponent', () => {
  let component: ShowSeanceComponent;
  let fixture: ComponentFixture<ShowSeanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSeanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSeanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
