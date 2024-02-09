import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { InterfaceTypeAnalyse } from '../list-type-analyse/list-type-analyse.component';
import { Router } from '@angular/router';
import { ListTypeAnalyseService } from '../services/list-type-analyse.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'kt-add-type-analyse',
  templateUrl: './add-type-analyse.component.html',
  styleUrls: ['./add-type-analyse.component.scss']
})
export class AddTypeAnalyseComponent implements OnInit {

  constructor(private router:Router,private service:ListTypeAnalyseService) { }

  status:InterfaceTypeAnalyse;
  FormArtical:FormGroup;
  ngOnInit() {
    this.FormArtical=new FormGroup({
      id:new FormControl(''),
      libelle:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
    })
      
    }
  RetourEmbalages(): void {
		this.router.navigate(["/bmh/list-type-analyse"]);
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
