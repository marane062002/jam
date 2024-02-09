import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypeServiceService } from '../services/type-service.service';
import { InterfaceType } from '../list-types/list-types.component';
import { FormControl, FormGroup, Validators, AsyncValidatorFn} from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-add-types',
  templateUrl: './add-types.component.html',
  styleUrls: ['./add-types.component.scss']
})
export class AddTypesComponent implements OnInit {

  // type:InterfaceType[]=[
  //   {
  //     id : 0,
  //     libelle:'',
  //     description:''
  // }
  // ]
  FormArticle: FormGroup;

  constructor(private router: Router,private service : TypeServiceService,private location: Location) { }

  ngOnInit() {
    this.FormArticle= new FormGroup({
 
      id: new FormControl('',),
      libelle:new FormControl('', Validators.required),
      description: new FormControl('',Validators.required),
      
        });
  }
  

  RetourEmbalages(): void {
		this.router.navigate(["/bmh/list-types"]);
	}
  retournerPagePrecedente() {
    this.location.back();
  }


ajouter() {
  console.log(this.FormArticle.value);
  if (this.FormArticle.valid) {
    this.service.createType(this.FormArticle.value).subscribe(
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
