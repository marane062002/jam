import { Component, OnInit } from '@angular/core';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../shared/notification.service';
import { environment } from './../../../../../../environments/environment';

export interface MarcheTab {
	label: string;
	content: string;
}
@Component({
  selector: 'kt-marche-show',
  templateUrl: './marche-show.component.html',
  styleUrls: ['./marche-show.component.scss']
})
export class MarcheShowComponent implements OnInit {
// =====================================
	// Declarations
	// =====================================
	asyncTabs: Observable<MarcheTab[]>;
	selected = new FormControl(0);
  id:number;
  marche:any;
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

      this.getMarche(this.id)

      this.asyncTabs = new Observable(
        (observer: Observer<MarcheTab[]>) => {
          setTimeout(() => {
            observer.next([
              {
                label: "PAGES.GENERAL.MAGASINS",
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
   
    
    

   
    /*   this.service.getFilesById(this.id,'/PjLmarcheDecisions/index/')
      .subscribe(data => {
       
        this.pjs = data;
        this.loader = true
        console.log(this.pjs)  
      }, error => console.log(error));

      this.service.getFilesById(this.id,'/PjLmarchePhotos/index/')
      .subscribe(data => {
       
        this.photos = data;
        this.loader = true
        console.log(this.photos)  
      }, error => console.log(error)); */
    

  }

  async getMarche(id){
    await  this.service.getMarcheById(id)
    .subscribe(data => {
     
      this.marche = data[0];
      
    }, error => console.log(error));

  }

  public delete(id: number) {
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service.deleteMarche(id)
      .subscribe(
        data => {
          console.log(data),
          this.router.navigateByUrl('/marche/marche-index') 
        },
        error => console.log(error)); 
        this.notification.warn(
        	this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      	);
    }
     
  }

  update(id){
    this.router.navigate(['/marche/marche-edit'], { queryParams: { id: id } })
  } 
 

  onClickPjName(e,id) {
		console.log('You clicked: '+e) ;
		var r=e.substring(0,e.length-4);
		console.log(r)
		window.open(environment.API_ALFRESCO_URL + "/PjLmarcheDecisions/"+r, '_blank');
    }
    onClickPhotoName(e,id) {
      console.log('You clicked: '+e) ;
      var r=e.substring(0,e.length-4);
      console.log(r)
      window.open(environment.API_ALFRESCO_URL + "/PjLmarchePhotos/"+r, '_blank');
      }

}
