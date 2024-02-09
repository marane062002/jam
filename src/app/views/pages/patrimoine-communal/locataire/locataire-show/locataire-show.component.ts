import { Component, OnInit } from '@angular/core';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'kt-locataire-show',
  templateUrl: './locataire-show.component.html',
  styleUrls: ['./locataire-show.component.scss']
})
export class LocataireShowComponent implements OnInit {

  id:number;
  locataire:any;
  constructor(private service:BienscommunalService,
    private router: Router,private route: ActivatedRoute,
    private translate:TranslateService,
    private notification:NotificationService) { 

      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
      });
      this.getLocataire(this.id)
    }

  ngOnInit() {
  }
  async getLocataire(id){
    await  this.service.getLocataireById(id)
    .subscribe(data => {
     
      this.locataire = data[0];
    console.log(this.locataire)
    }, error => console.log(error));
  
  }
  

  delete(id: number): void {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service
			.deleteLocataire( id)
			.subscribe(data => {
        console.log(data.id)
				this.router.navigate(['/locataire/locataire-index']);
			});
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}

  update(id){
    this.router.navigate(['/locataire/locataire-edit'], { queryParams: { id: id } })
  }

}
