import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TypeVaccinationService } from '../services/type-vaccination.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-add-type-vaccination',
  templateUrl: './add-type-vaccination.component.html',
  styleUrls: ['./add-type-vaccination.component.scss']
})
export class AddTypeVaccinationComponent implements OnInit {

  FormArticle: FormGroup;

  constructor(private router:Router,private service:TypeVaccinationService) { }

  ngOnInit() {
    this.FormArticle= new FormGroup({
 
      id: new FormControl('',),
      libelle:new FormControl('', Validators.required),
      description: new FormControl('',Validators.required),
      
        });
  }
  RetourEmbalages(): void {
		this.router.navigate(["/bmh/list-type-vaccination"]);
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
            this.RetourEmbalages()
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
