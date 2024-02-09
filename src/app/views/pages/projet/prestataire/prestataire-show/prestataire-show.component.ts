import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../../services/projet.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'kt-prestataire-show',
  templateUrl: './prestataire-show.component.html',
  styleUrls: ['./prestataire-show.component.scss']
})
export class PrestataireShowComponent implements OnInit {

  id:number;
  prestataire:any;
   pjs:any;
  constructor(private service:ProjetService,
    private translate : TranslateService,
    private notification: NotificationService,
    private router: Router,private route: ActivatedRoute) { 

      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
      });
 
      this.getPrestataire(this.id)
    }

  ngOnInit() {
   
  }

  getPrestataire(id){
    this.service.getDataShowPrestataireById(id)
    .then(data => {
     
      this.prestataire = data;
     if(this.pjs!= null){
      this.pjs = data[1]
     }
    }, error => console.log(error));
  }

  // public delete(id: number) {
  //   if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
  //     this.service.deletePrestataire(id)
  //     .subscribe(
  //       data => {
  //         console.log(data),
  //         this.router.navigateByUrl('prestataire/prestataire-index') 
  //       },
  //       error => console.log(error)); 
  //       this.notification.warn(
  //       	this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
  //     	);
  //   }  
  // }
  public delete() {
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service.deletePrestataire(this.id)
      .subscribe(
        data => {
          console.log(data),
          this.router.navigateByUrl('prestataire/prestataire-index')
        },
        error => console.log(error)); 
        this.notification.warn(
        	this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      	);
    }
     
  }


  update(){
    this.router.navigate(['/prestataire/prestataire-edit'], { queryParams: { id: this.id } })
  } 

  onClickPjName(e,id) {
		console.log('You clicked: '+e) ;
    var r=e.substring(0,e.length-4);
       
    window.open(environment.API_ALFRESCO_URL +'/PjPrestataires/'+r);   
    
	  }

}
