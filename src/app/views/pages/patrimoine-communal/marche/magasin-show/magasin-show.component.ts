import { Component, OnInit } from '@angular/core';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { FormControl } from '@angular/forms';
import { environment } from './../../../../../../environments/environment';

export interface MagasinTab {
	label: string;
	content: string;
}
@Component({ 
  selector: 'kt-magasin-show',
  templateUrl: './magasin-show.component.html',
  styleUrls: ['./magasin-show.component.scss']
})
export class MagasinShowComponent implements OnInit {
// =====================================
	// Declarations
	// =====================================
	asyncTabs: Observable<MagasinTab[]>;
	selected = new FormControl(0);
  id:number;
  idParent:number;
  magasin:any;
  photos:any; 
  loading = false
  constructor(private service:BienscommunalService,
    private router: Router,private route: ActivatedRoute) { 

      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
        this.idParent=params['idParent']
      });

      this.asyncTabs = new Observable(
        (observer: Observer<MagasinTab[]>) => {
          setTimeout(() => {
            observer.next([
              {
                label: "PAGES.GENERAL.MVML",
                content: '1',
              }/* ,
               {
                label: "PAGES.GENERAL.PATRIMOINE_MVMT",
                content: "2"
              } */
             ]);
          }, 1000);
        } 
      ); 
    }

  ngOnInit() {
    this.service.getMagasinById(this.id)
      .then(data => {
       
        this.magasin = data;
       
      }, error => console.log(error));
    
     /*  this.service.getFilesById(this.id,'/PjMagasinPhotos/index/')
      .subscribe(data => {
       
        this.photos = data;
       
        console.log(this.photos)  
      }, error => console.log(error)); */
  }

  
  public magasinDelete(id: number) {
  /*   this.service.deleteMagasin(id)
      .subscribe(
        data => {
          console.log(data),
          this.router.navigate(['marche/marche-index']) 
          
        },
        error => console.log(error)); */
  }

  update(){
    this.router.navigate(['/marche/magasin-edit'],{ queryParams: { id: this.id, idParent : this.idParent } })
  }

  newMvmL(id){
    this.router.navigate(['/marche/loyer-new'], { queryParams: { id: id } })
  } 
  showMarche(id){
    this.router.navigate(['/marche/marche-show'], { queryParams: { id: id } })
  } 

  onClickPhotoName(e,id) {
    console.log('You clicked: '+e) ;
    var r=e.substring(0,e.length-4);
    console.log(r)
    window.open(environment.API_ALFRESCO_URL + "/PjMagasinPhotos/"+r, '_blank');
    }
 
}
