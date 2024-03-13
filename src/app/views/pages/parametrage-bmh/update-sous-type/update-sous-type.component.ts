import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SousTypeService } from '../services/sous-type.service';

@Component({
  selector: 'kt-update-sous-type',
  templateUrl: './update-sous-type.component.html',
  styleUrls: ['./update-sous-type.component.scss']
})
export class UpdateSousTypeComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,private service:SousTypeService) { }
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
		this.router.navigate(["/bmh/list-sous-type"]);
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
            this.RetourEmbalages()
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
