import { Component, OnInit } from '@angular/core';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../shared/notification.service';
import { environment } from './../../../../../../environments/environment';

export interface HabitationTab {
	label: string;
	content: string;
}
@Component({
  selector: 'kt-habitation-show',
  templateUrl: './habitation-show.component.html',
  styleUrls: ['./habitation-show.component.scss']
})
export class HabitationShowComponent implements OnInit {
  // =====================================
	// Declarations
	// =====================================
	asyncTabs: Observable<HabitationTab[]>;
	selected = new FormControl(0);
  id:number;
  habitation:any;
  pjs:any;
  photos:any; 
  loader = false;
  constructor(private service:BienscommunalService,
    private router: Router,private route: ActivatedRoute,
    private translate:TranslateService,
    private notification:NotificationService) { 
      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
      });
    
      this.getHabitation(this.id)

      this.asyncTabs = new Observable(
        (observer: Observer<HabitationTab[]>) => {
          setTimeout(() => {
            observer.next([
              {
                label: "PAGES.GENERAL.APPARTEMENTS",
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
   
   

     /*  this.service.getFilesById(this.id,'/PjHabitationDocs/index/')
      .subscribe(data => {
       
        this.pjs = data;
        this.loader = true
        console.log(this.pjs)  
      }, error => console.log(error));

      this.service.getFilesById(this.id,'/PjHabitationPhotos/index/')
      .subscribe(data => {
       
        this.photos = data;
        this.loader = true
        console.log(this.photos)  
      }, error => console.log(error)); */
    

  }

  getHabitation(id){
    this.service.getHabitationById(id)
    .then(data => {
     
      this.habitation = data;
      console.log(this.habitation)
    }, error => console.log(error));
  }

  public delete(id: number) {
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service.deleteHabitation(id)
      .subscribe(
        data => {
          console.log(data),
          this.router.navigateByUrl('habitation/habitation-index') 
        },
        error => console.log(error)); 
        this.notification.warn(
        	this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      	);
    }
     
  }

  update(id){
    this.router.navigate(['/habitation/habitation-edit'], { queryParams: { id: id } })
  } 


  onClickPjName(e,id) {
		console.log('You clicked: '+e) ;
		var r=e.substring(0,e.length-4);
		console.log(r)
		window.open(environment.API_ALFRESCO_URL + "/PjHabitationDocs/"+r, '_blank');
    }
    onClickPhotoName(e,id) {
      console.log('You clicked: '+e) ;
      var r=e.substring(0,e.length-4);
      console.log(r)
      window.open(environment.API_ALFRESCO_URL + "/PjHabitationPhotos/"+r, '_blank');
      }


}
