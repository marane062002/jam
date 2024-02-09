import { Component, OnInit } from '@angular/core';
import { InterfaceTransfert } from '../list-transfert/list-transfert.component';
import { InterfaceConducteur } from '../../parametrage-bmh/list-conducteur/list-conducteur.component';
import { InterfaceVehicule } from '../../parametrage-bmh/list-vehicule/list-vehicule.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ConducteurService } from '../../parametrage-bmh/services/conducteur.service';
import { TransfertService } from '../services/transfert.service';
import { VehiculeService } from '../../parametrage-bmh/services/vehicule.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'kt-add-transfert',
  templateUrl: './add-transfert.component.html',
  styleUrls: ['./add-transfert.component.scss']
})
export class AddTransfertComponent implements OnInit {

  id:any
  transfert:InterfaceTransfert[]=[]
  conducteur:InterfaceConducteur[]=[]
  vehicule:InterfaceVehicule[]=[]
  ajoutForm:any
  constructor(private route:ActivatedRoute, private router:Router,private formBuilder:FormBuilder,private conducteurService:ConducteurService,private service:TransfertService,private vehiculeService:VehiculeService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      });
    this.ajoutForm = this.formBuilder.group({
      // id: [null], // Exemple de champ non modifiable
      vehicule: [''],
      conducteur: [''],
      pointDepart: [''],
      pointArrive: [''],
      lieuInhumation: [''],
      numBulletin: [''],
      remarque: [''],
    });
    this.conducteurService.getAll().subscribe(res=>{ 
      this.conducteur=res
    })
    this.vehiculeService.getAll().subscribe(res=>{
      this.vehicule=res
    })
  }
  RetourEmbalages(){
    this.router.navigate(["/bmh1/add-cadavre/",this.id])
  }
  ajouter(){
    
    if(this.ajoutForm.valid){
      
      this.service.create(this.ajoutForm.value).subscribe(
        (res) => {
          
          console.log(res);
          Swal.fire({
            title: 'Enregistrement réussi!',
            text: 'Constateur enregistré avec succès.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.RetourEmbalages();
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
