import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Reparation } from '../../../../../../core/_base/layout/models/parcAUto/reparation';
import { ReparationServiceService } from '../../../../../../core/_base/layout/services/parcAuto/reparation-service.service';
import Swal from 'sweetalert2';
import { AppState } from '../../../../../../core/reducers';
import { select, Store } from '@ngrx/store';
import { currentUser, User } from '../../../../../../core/auth';
import { Observable } from 'rxjs';
import { VehiculeService } from '../../../parametrage/vehicules/services/vehicule.service';

@Component({
  selector: 'kt-new-reparation',
  templateUrl: './new-reparation.component.html',
  styleUrls: ['./new-reparation.component.scss']
})
export class NewReparationComponent implements OnInit {
  formReparation: FormGroup;
  user : Observable<User>;
  idFonctionniare=0;
  listVehucile: any[];
  constructor(private reparationService:ReparationServiceService,  private store: Store<AppState>,
    private serviceVihucle:VehiculeService) { 
    this.user=  this.store.pipe(select(currentUser));
    this.formReparation= new FormGroup({
      commentaire: new FormControl('',Validators.required),
      vehicule: new FormControl('',Validators.required),
      dateReparation: new FormControl('',Validators.required),
      fonctionaire_id: new FormControl('',Validators.required),
      type: new FormControl('1'),
      
  })
  }

  ngOnInit() {
    this.user.subscribe(res=>{
      this.idFonctionniare=res.id;
      this.formReparation.controls["fonctionaire_id"].setValue(this.idFonctionniare);
    })
    this.allCars();
  }

  allCars(){
    this.serviceVihucle.findAll().subscribe(res=>{
      this.listVehucile=res.body||[];
    })
  }
  ajouterInfoReparation(value:Reparation) {

    if(this.formReparation.valid){
      this.reparationService.save(value).subscribe(res=>{
        console.log(res);
        this.close();
        this.ngOnInit(); 
    Swal.fire({
      title: 'Reparation a été ajoutée avec succés',
      icon: 'success',
    });
      },err=>{
        console.log(err)
      })
    }else{
      const controls = this.formReparation.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
            console.log(name)
          }
    }}
  }
  close(){

  }
    

}
