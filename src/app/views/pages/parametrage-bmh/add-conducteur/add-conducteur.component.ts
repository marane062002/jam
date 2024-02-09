import { Component, OnInit } from '@angular/core';
import { ConducteurService } from '../services/conducteur.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-add-conducteur',
  templateUrl: './add-conducteur.component.html',
  styleUrls: ['./add-conducteur.component.scss']
})
export class AddConducteurComponent implements OnInit {

  FormArtical:FormGroup

  constructor(private service:ConducteurService,private router:Router) { 
    this.FormArtical=new FormGroup({
      id:new FormControl(''),
      nom:new FormControl('',Validators.required),
      prenom:new FormControl('',Validators.required),
      cin:new FormControl('',Validators.required),
      tel:new FormControl('',Validators.required),
    })
  }

  ngOnInit() {
  }
  RetourEmbalages(): void {
		this.router.navigate(["/bmh/list-conducteur"]);
	}
  ajouter(){
   if(this.FormArtical.valid){
    this.service.create(this.FormArtical.value).subscribe(
      (res) => {
        console.log(res);
        Swal.fire({
          title: 'Enregistrement réussi!',
          text: 'Conducteur enregistré avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.FormArtical.reset();
          this.ngOnInit(); // Vous pouvez recharger les données si nécessaire ici
        });
      },
      (err) => {
        console.error(err);
        Swal.fire({
          title: 'Erreur!',
          text: 'Un problème est survenu lors de l\'enregistrement du Constateur.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );

    }
   }
  }


