import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Reference } from '../../../../../../core/_base/layout/models/reference';
import { AccessoireVehicule } from '../../../common/models/accessoire-vehicule.model';
import { AccessoireVehiculeService } from '../services/accessoire-vehicule.service';

@Component({
  selector: 'kt-new-accessiore-vehicule',
  templateUrl: './new-accessiore-vehicule.component.html',
  styleUrls: ['./new-accessiore-vehicule.component.scss']
})
export class NewAccessioreVehiculeComponent implements OnInit {

  FormReference: FormGroup;
  accessoire:AccessoireVehicule;
  accessiores:AccessoireVehicule[];
  reference=new Reference();

  
  constructor(
    private refernceService:AccessoireVehiculeService,) {
      this.FormReference= new FormGroup({
        code: new FormControl('',Validators.required),
        name: new FormControl('',Validators.required),
        id: new FormControl('')
    })
  }

  ngOnInit() {
   
  }
  createEntityMagasin(value:Reference){
    if(this.FormReference.valid){
      this.refernceService.create(value).subscribe(res=>{
        console.log(res)
        this.alert('success',"Gestion des accessoires", "accessoire a été bien enregistré ");
      
        this.FormReference.reset();
        this.ngOnInit();
      },err=>{
         if(err.status===409){
          this.alert('warning',"Gestion des accessoires", "libelle Référentiel  déja existe ");
        }else{ 

          this.alert('error',"Gestion des accessoires", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
        }
        console.log(err)
      })
    }
  }
  alert(icon:SweetAlertIcon, title:string, message:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
    })
  }
}
