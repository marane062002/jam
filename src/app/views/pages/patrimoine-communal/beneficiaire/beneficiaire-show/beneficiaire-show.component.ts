import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../shared/notification.service';
import { BienscommunalService } from '../../services/bienscommunal.service';

@Component({
  selector: 'kt-beneficiaire-show',
  templateUrl: './beneficiaire-show.component.html',
  styleUrls: ['./beneficiaire-show.component.scss']
})
export class BeneficiaireShowComponent implements OnInit {

  id:number;
  beneficiaire:any;

  constructor(
    private service:BienscommunalService,
    private router: Router,private route: ActivatedRoute,
    private translate:TranslateService,
    private notification:NotificationService
  ) { 
    this.route.queryParams.subscribe(params => {
      this.id= params['id'];
    });
    this.getBeneficiaire(this.id)
  }

  ngOnInit() {
    
  }

  async getBeneficiaire(id){
    await  this.service.getBeneficiaireById(id)
    .subscribe(data => {
     
      this.beneficiaire = data[0];
    console.log(this.beneficiaire)
    }, error => console.log(error));

}

delete(id: number): void {
  if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
    this.service
    .deleteBeneficiaire( id)
    .subscribe(data => {
      console.log(data.id)
      this.router.navigate(['/beneficiaire/beneficiaire-index']);
    });
    this.notification.warn(
      this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
    );
  }
}

update(id){
  this.router.navigate(['/beneficiaire/beneficiaire-edit'], { queryParams: { id: id } })
}

}
