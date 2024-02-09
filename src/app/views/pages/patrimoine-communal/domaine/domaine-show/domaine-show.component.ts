import { Component, OnInit } from '@angular/core';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../shared/notification.service';
export interface DomaineTab {
	label: string;
	content: string;
}
@Component({
  selector: 'kt-domaine-show',
  templateUrl: './domaine-show.component.html',
  styleUrls: ['./domaine-show.component.scss']
})
export class DomaineShowComponent implements OnInit {
 
  // =====================================
	// Declarations
	// =====================================
	asyncTabs: Observable<DomaineTab[]>;
	selected = new FormControl(0);
  id:number;
  domaine:any;
  photos:any; 
  pjDecision:any; 
  constructor(private service:BienscommunalService,
      private notification:NotificationService,
      private translate:TranslateService,
    private router: Router,private route: ActivatedRoute) { 
      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
      });

      this.getDomaine(this.id)

      this.asyncTabs = new Observable(
        (observer: Observer<DomaineTab[]>) => {
          setTimeout(() => {
            observer.next([
              {
                label:  "PAGES.GENERAL.BENIF",
               content: "1"
              },
              {
                label: "PAGES.GENERAL.PJS",
                content: '2',
              
             } 
             ]);
          }, 1000);
        } 
      ); 
    }

  ngOnInit() {
   
  }
  
  getDomaine(id){
    this.service.getDomaineById(id)
      .then(data => {
        console.log(id)
        console.log(data)
        this.domaine = data;
      
      }, error => console.log(error));
  }

  public delete(id: number) {
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service.deleteDomaine(id)
      .subscribe(
        data => {
          console.log(data),
          this.router.navigateByUrl('domaine/domaine-index')
        },
        error => console.log(error)); 
        this.notification.warn(
        	this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      	);
    }
     
  }

  update(id){
    this.router.navigate(['/domaine/domaine-edit'], { queryParams: { id: id } })
  } 
 

}
