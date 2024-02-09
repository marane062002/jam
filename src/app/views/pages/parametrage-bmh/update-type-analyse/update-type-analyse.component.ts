import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListTypeAnalyseService } from '../services/list-type-analyse.service';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-update-type-analyse',
  templateUrl: './update-type-analyse.component.html',
  styleUrls: ['./update-type-analyse.component.scss']
})
export class UpdateTypeAnalyseComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,private service:ListTypeAnalyseService) { }
  FormArticle= new FormGroup({
 
    id: new FormControl(''),
    libelle: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    
      });

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    this.service.getById(id).subscribe((res)=>{
      console.log(res)
              this.FormArticle.patchValue({...res});
              this.FormArticle.value 
    },
    (err)=>{
          console.log(err)
    });
  }
  RetourEmbalages(): void {
		this.router.navigate(["/bmh/list-type-analyse"]);
	}
  update(){
    if(this.FormArticle.valid){
      this.service.update(this.FormArticle.value.id,this.FormArticle.value).subscribe(
        (res) => {
          console.log('Type mis à jour avec succès :', res);
          Swal.fire({
            title: 'Enregistrement réussi!',
            text: 'Type Examen enregistré avec succès.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.FormArticle.reset();
            this.ngOnInit(); // Vous pouvez recharger les données si nécessaire ici
          });
        },
        (err) => {
          console.error('Erreur lors de la mise à jour du type :', err);
          Swal.fire({
            title: 'Erreur!',
            text: 'Un problème est survenu lors de l\'enregistrement du Type examen.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      )
    }else{
      console.log('le formulaire est invalide');
    }
    }
}
