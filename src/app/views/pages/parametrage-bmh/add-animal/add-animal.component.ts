import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AnimalService } from '../services/animal.service';

@Component({
  selector: 'kt-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.scss']
})
export class AddAnimalComponent implements OnInit {

  FormArticle: FormGroup;

  constructor(private router:Router,private service:AnimalService) { }

  ngOnInit() {
    this.FormArticle= new FormGroup({
 
      id: new FormControl('',),
      libelle:new FormControl('', Validators.required),
      description: new FormControl('',Validators.required),
      
        });
  }
  RetourEmbalages(): void {
		this.router.navigate(["/bmh/list-animal"]);
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
