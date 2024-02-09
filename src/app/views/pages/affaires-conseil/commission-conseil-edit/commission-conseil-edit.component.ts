import { Component, OnInit } from '@angular/core';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-commission-conseil-edit',
  templateUrl: './commission-conseil-edit.component.html',
  styleUrls: ['./commission-conseil-edit.component.scss']
})
export class CommissionConseilEditComponent implements OnInit {

  idCommission;
  formData={"objectif":"","nomCommission":""}
  constructor(private service1 : AffairesConseilService, private router: Router,private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idCommission= params['id'];
     }); 

     this.getCommission();
  }

  async getCommission(){
    await this.service1.getCommissionById(this.idCommission).subscribe(data=>{
      this.formData=data;       
    })
  }

  send(){
  this.service1.editCommission(this.formData)
   .subscribe((resfork) => { 
     this.router.navigate(['/affaires-conseil/commission-list'] )
  });
       }
}
