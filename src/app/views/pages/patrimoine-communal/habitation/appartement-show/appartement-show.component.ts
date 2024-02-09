import { Component, OnInit } from '@angular/core';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { FormControl } from '@angular/forms';
import { environment } from './../../../../../../environments/environment';

export interface AppartementTab {
	label: string;
	content: string;
}

@Component({
  selector: 'kt-appartement-show',
  templateUrl: './appartement-show.component.html',
  styleUrls: ['./appartement-show.component.scss']
})
export class AppartementShowComponent implements OnInit {
// =====================================
	// Declarations
	// =====================================
	asyncTabs: Observable<AppartementTab[]>;
	selected = new FormControl(0);
  id:number;
  idParent:number;
  loadin = false
  appartement:any;
  photos:any; 
  constructor(private service:BienscommunalService,
    private router: Router,private route: ActivatedRoute) { 

      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
        this.idParent= params['idParent'];
      });

      this.asyncTabs = new Observable(
        (observer: Observer<AppartementTab[]>) => {
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
   
    
    

    this.service.getAppartementById(this.id)
      .then(data => {
       
        this.appartement = data;
       
      }, error => console.log(error));
    
     /*  this.service.getFilesById(this.id,'/PjApptPhotos/index/')
      .subscribe(data => {
       
        this.photos = data;
       
        console.log(this.photos)  
      }, error => console.log(error)); */
  }
  public appartementDelete(id: number) {
    /* this.service.deleteAppartement(id)
      .subscribe(
        data => {
          console.log(data),
          this.router.navigate(['habitation/habitation-index']) 
          
        },
        error => console.log(error)); */
  }
  update(){
    this.router.navigate(['/habitation/appartement-edit'], { queryParams: { id: this.id, idParent : this.idParent } })
  }
  newMvmL(id){
    this.router.navigate(['/habitation/loyer-new'], { queryParams: { id: id } })
  } 
  showHabitation(id){
    this.router.navigate(['/habitation/habitation-show'], { queryParams: { id: id } })
  } 

  onClickPhotoName(e,id) {
    console.log('You clicked: '+e) ;
    var r=e.substring(0,e.length-4);
    console.log(r)
    window.open(environment.API_ALFRESCO_URL + "/PjApptPhotos/"+r, '_blank');
    }

 
}
