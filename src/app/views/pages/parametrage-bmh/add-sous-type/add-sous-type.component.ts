import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { InterfaceSousType } from '../list-sous-type/list-sous-type.component';
import { Router } from '@angular/router';
import { SousTypeService } from '../services/sous-type.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'kt-add-sous-type',
  templateUrl: './add-sous-type.component.html',
  styleUrls: ['./add-sous-type.component.scss']
})
export class AddSousTypeComponent implements OnInit {

  constructor(private router:Router,private service:SousTypeService) { }

  // sousType:InterfaceSousType;
  FormArtical:FormGroup;
  ngOnInit() {
    this.FormArtical=new FormGroup({
      id:new FormControl(''),
      libelle:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
    })
      
    }
  RetourEmbalages(): void {
		this.router.navigate(["/bmh/list-sous-type"]);
	}

  ajouter(){
    if(this.FormArtical.valid){
      this.service.create(this.FormArtical.value).subscribe(res=>{
        Swal.fire({
          title: 'Enregistrement réussi!',
          text: 'Type enregistré avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.FormArtical.reset();
          this.ngOnInit(); // Vous pouvez recharger les données si nécessaire ici
        });
      },err=>{
        console.log(err);
        Swal.fire({
          title: 'Erreur!',
          text: 'Un problème est survenu lors de l\'enregistrement du type.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      })
    }
   
   
  }

}
