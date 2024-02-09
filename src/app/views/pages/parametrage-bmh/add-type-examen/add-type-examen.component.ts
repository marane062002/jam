import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypeExamenService } from '../services/type-examen.service';
import { InterfaceTypeExamen } from '../list-type-examen/list-type-examen.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-add-type-examen',
  templateUrl: './add-type-examen.component.html',
  styleUrls: ['./add-type-examen.component.scss']
})
export class AddTypeExamenComponent implements OnInit {

  FormArticle: FormGroup;

  constructor(private router:Router,private service:TypeExamenService) { }

  ngOnInit() {
    this.FormArticle= new FormGroup({
 
      id: new FormControl('',),
      libelle:new FormControl('', Validators.required),
      description: new FormControl('',Validators.required),
      
        });
  }
  RetourEmbalages(): void {
		this.router.navigate(["/bmh/list-type-examen"]);
	}

  ajouter(){

    if(this.FormArticle.valid){
      this.service.create(this.FormArticle.value).subscribe(
        (res) => {
          console.log(res);
          Swal.fire({
            title: 'Enregistrement réussi!',
            text: 'Type enregistré avec succès.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.FormArticle.reset();
            this.ngOnInit(); // Vous pouvez recharger les données si nécessaire ici
          });
        },
        (err) => {
          console.error(err);
          Swal.fire({
            title: 'Erreur!',
            text: 'Un problème est survenu lors de l\'enregistrement du type.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  }
   


}
