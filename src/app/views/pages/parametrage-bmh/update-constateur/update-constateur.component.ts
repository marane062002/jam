import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstateurService } from '../services/constateur.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-update-constateur',
  templateUrl: './update-constateur.component.html',
  styleUrls: ['./update-constateur.component.scss']
})
export class UpdateConstateurComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,private service:ConstateurService) { }
  FormArticle= new FormGroup({
 
    id: new FormControl(''),
    nom: new FormControl('',Validators.required),
    prenom: new FormControl('',Validators.required),
    cin: new FormControl('',Validators.required),
    tel: new FormControl('',Validators.required),
    
      });
  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    this.service.detailsConstateur(id).subscribe((res)=>{
      console.log(res)
              this.FormArticle.patchValue({...res});
              this.FormArticle.value 
    },
    (err)=>{
          console.log(err)
    });   
  }

  RetourEmbalages(): void {
		this.router.navigate(["bmh/list-constateur"]);
	}

  update(){
    if (this.FormArticle.valid) {
      this.service.updateConstateur(this.FormArticle.value.id,this.FormArticle.value).subscribe(
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
            this.RetourEmbalages()
          });
        },
        (err) => {
          console.error(err);
          Swal.fire({
            title: 'Erreur!',
            text: 'Un problème est survenu lors de l\'enregistrement du constateur.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
      }else{
        console.log('le formulaire est invalide');
      }
    }  
}


