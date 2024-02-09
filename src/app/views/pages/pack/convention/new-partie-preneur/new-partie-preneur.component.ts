import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { PartiePreneurService } from '../../../shared/PartiePreneurService';

@Component({
  selector: 'kt-new-partie-preneur',
  templateUrl: './new-partie-preneur.component.html',
  styleUrls: ['./new-partie-preneur.component.scss']
})
export class NewPartiePreneurComponent implements OnInit {
//
isVisible: any;
isSelected: boolean = false;
formPP:FormGroup;
PP_id;
isUpdate: boolean = false;
constructor(private router: Router, 
  private activatedRoute:ActivatedRoute,
  private translate:TranslateService,
private partiePreneurService:PartiePreneurService) {
  this.formPP = new FormGroup({
    id: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    email: new FormControl(''),
    tel: new FormControl(''),
    organisme: new FormControl(''),
    });
}

ngOnInit() {
  
  this.activatedRoute.queryParams.subscribe(params => {
    this.PP_id= params['id']; 
    if(this.PP_id!=undefined && this.PP_id!=0){
      this.isUpdate=true;
      this.partiePreneurService.findById(this.PP_id).subscribe((res:any)=>{
       this.formPP.patchValue(res);
       },err=>{
      console.log(err);
       })
    }
  })

}

RetourEmbalages(){
  this.router.navigate(["convention/PartiePreneurList"]);
}

onSubmit(){
  this.partiePreneurService.save(this.formPP.value).subscribe(res=>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
      showConfirmButton: false,
      timer: 1500
      })
    this.RetourEmbalages();
  },err=>{
    console.log(err)
  })
}

}
