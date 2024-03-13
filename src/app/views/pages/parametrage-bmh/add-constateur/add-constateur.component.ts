import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InterfaceConstateur } from '../list-constateur/list-constateur.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConstateurService } from '../services/constateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-add-constateur',
  templateUrl: './add-constateur.component.html',
  styleUrls: ['./add-constateur.component.scss']
})
export class AddConstateurComponent implements OnInit {

  constructor(private router:Router,private service:ConstateurService) { }

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
		this.router.navigate(["/bmh/list-constateur"]);
	}

  addConstateur(){
    if(this.FormArticle.valid){
      this.service.CreateConstateur(this.FormArticle.value).subscribe(
        (res) => {
          console.log(res);
          Swal.fire({
            title: 'Enregistrement réussi!',
            text: 'Constateur enregistré avec succès.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.FormArticle.reset();
            this.RetourEmbalages()
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
