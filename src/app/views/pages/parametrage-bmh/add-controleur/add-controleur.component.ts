import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ControleurService } from '../services/controleur.service';

@Component({
  selector: 'kt-add-controleur',
  templateUrl: './add-controleur.component.html',
  styleUrls: ['./add-controleur.component.scss']
})
export class AddControleurComponent implements OnInit {

  constructor(private router:Router,private service:ControleurService) { }

  FormArticle:FormGroup;
  ngOnInit() {
    this.FormArticle= new FormGroup({
 
      id: new FormControl('',),
      nom:new FormControl('', Validators.required),
      prenom: new FormControl('',Validators.required),
      cin: new FormControl('',Validators.required),
      tel: new FormControl('',Validators.required),
      
        });
  }
  RetourEmbalages(): void {
		this.router.navigate(["/bmh/list-controleur"]);
	}

  addConstateur(){
    if(this.FormArticle.valid){
      this.service.Create(this.FormArticle.value).subscribe(
        (res) => {
          console.log(res);
          Swal.fire({
            title: 'Enregistrement réussi!',
            text: 'Constateur enregistré avec succès.',
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
            text: 'Un problème est survenu lors de l\'enregistrement du Constateur.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    }
    }
  


}
