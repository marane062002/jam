import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EquipeService } from '../services/equipe.service';

@Component({
  selector: 'kt-add-equipe',
  templateUrl: './add-equipe.component.html',
  styleUrls: ['./add-equipe.component.scss']
})
export class AddEquipeComponent implements OnInit {

  constructor(private router:Router,private service:EquipeService) { }

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
		this.router.navigate(["/bmh/list-equipe"]);
	}

  addConstateur(){
    if(this.FormArticle.valid){
      this.service.create(this.FormArticle.value).subscribe(
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
            this.RetourEmbalages();
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
