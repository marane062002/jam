import { Component, OnInit } from '@angular/core';
import { ConsultationService } from '../../shared/consultation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-commission-consultation-detail',
  templateUrl: './commission-consultation-detail.component.html',
  styleUrls: ['./commission-consultation-detail.component.scss']
})
export class CommissionConsultationDetailComponent implements OnInit {

  constructor(private service : ConsultationService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
    idcommission;
    commission={"id":0,
    "typeCommission":{"id":0,"libelle":""},
    "dateOuveture":null,"consultation":{"id":0}};
  
  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      this.idcommission= params['id'];
     });
     this.service.getCommissionById(this.idcommission).subscribe(data => {
       console.log(data);
      this.commission= data;
     });
    

  }
  
  ShowOffreDeposee(){
    console.log(this.commission)
    this.router.navigate(['/marches/commission-consultation-detail/offres-deposees-consultation'], 
    { queryParams: { id: this.commission.consultation.id, 
      typecommission:this.commission.typeCommission.id } });
  }

  ShowPE(){
    this.router.navigate(['/marches/commission-consultation-detail/participants-externes-consultation'], 
    { queryParams: { id: this.commission.id
     }});
  }

  ShowPI(){
    this.router.navigate(['/marches/commission-consultation-detail/participants-internes-consultation'], 
    { queryParams: { id: this.commission.id
     }});
  }


}
