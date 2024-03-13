import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TypeControleService } from '../services/type-controle.service';
import { InterfaceTypeControle } from '../list-type-controle/list-type-controle.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'kt-add-type-controle',
  templateUrl: './add-type-controle.component.html',
  styleUrls: ['./add-type-controle.component.scss']
})
export class AddTypeControleComponent implements OnInit {

  constructor(private router:Router,private service:TypeControleService) { }

  status:InterfaceTypeControle;
  FormArtical:FormGroup;
  ngOnInit() {
    this.FormArtical=new FormGroup({
      id:new FormControl(''),
      libelle:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
    })
      
    }
  RetourEmbalages(): void {
		this.router.navigate(["/bmh/list-type-controle"]);
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
          this.RetourEmbalages()
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
