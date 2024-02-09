import { Component, OnInit } from '@angular/core';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../shared/notification.service';
export interface ToiletteTab {
	label: string;
	content: string;
}
@Component({
  selector: 'kt-toilette-show',
  templateUrl: './toilette-show.component.html',
  styleUrls: ['./toilette-show.component.scss']
})
export class ToiletteShowComponent implements OnInit {

  // =====================================
	// Declarations
	// =====================================
	asyncTabs: Observable<ToiletteTab[]>;
	selected = new FormControl(0);
  id:number;
  toilette:any;
  photos:any; 
  pjDecision:any; 
  constructor(private service:BienscommunalService,
    private translate:TranslateService,
    private notification:NotificationService,
    private router: Router,private route: ActivatedRoute) { 
      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
      }); 

      this.getToilette(this.id)

      this.asyncTabs = new Observable(
        (observer: Observer<ToiletteTab[]>) => {
          setTimeout(() => {
            observer.next([
              {
                label:  "PAGES.GENERAL.BENIF",    
                content: "1"
              } ,
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
  
  getToilette(id){
    this.service.getToiletteById(id)
      .then(data => {
       
        this.toilette = data;
       console.log(this.toilette)
      }, error => console.log(error));
  }

  
  delete(id: number): void {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service
			.deleteToilette( id)
			.subscribe(data => {
        console.log(data.id)
				this.router.navigate(['/toilette/toilette-index']);
			});
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}

  update(id){
    this.router.navigate(['/toilette/toilette-edit'], { queryParams: { id: id } })
  }
 
}
