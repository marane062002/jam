import { Component, OnInit } from '@angular/core';
import { Vehicule } from '../../gestion-parc-auto/common/models/vehicule.model';
import { VehiculeService } from '../services/vehicule.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-add-vehicule',
  templateUrl: './add-vehicule.component.html',
  styleUrls: ['./add-vehicule.component.scss']
})
export class AddVehiculeComponent implements OnInit {

  constructor(private router:Router,private service:VehiculeService) { }

  FormArtical:FormGroup;
  ngOnInit() {
    this.FormArtical=new FormGroup({
      id:new FormControl(''),
      libelle:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required)
    })
  }
  RetourEmbalages(): void {
		this.router.navigate(["/bmh/list-vehicule"]);
	}
  ajouter(){
    if(this.FormArtical.valid){
      this.service.create(this.FormArtical.value).subscribe( (res) => {
        console.log(res);
        Swal.fire({
          title: 'Enregistrement réussi!',
          text: 'Type enregistré avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.FormArtical.reset();
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
      )
      }
    }
}


