import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityArrayResponseType, VehiculeService } from '../../parametrage/vehicules/services/vehicule.service';
import { FonctionnaireArrayResponse, FonctionnaireService,FonctionnaireEntityResponse } from '../../../../../core/_base/layout/services/fonctionnaire.service';
import { FonctionnaireDTO } from '../../../../../core/_base/layout/models/fonctionnaire-dto';
import { IVehicule } from '../../common/models/vehicule.model';
import { VehiculeFonctionService } from '../../../../../core/_base/layout/services/parcAuto/vehicule-fonction.service';
import { VehiculeFonction } from '../../../../../core/_base/layout/models/parcAUto/vehicule-fonction';

@Component({
  selector: 'affectation-vehicule-fonction',
  templateUrl: './affectation-vehicule-fonction.component.html',
  styleUrls: ['./affectation-vehicule-fonction.component.scss']
})
export class AffectationVehiculeFonctionComponent implements OnInit {
  headerData:any=[
    { name: "Véhicule", content: "vehicule.matricule" },
    { name: "Date de début", content: "date" }, 
    { name: "montant", content: "montant" }
  ]
  id_vehicule=0;
  currentPage=0;
  size=5;
  totalPages=1;
  formAffectionVehicule: FormGroup;
  listAffectationVehicule:any[];
  fonctionnaire:FonctionnaireDTO;
  vehiculeFoncion:VehiculeFonction
  listFonctionnaire:FonctionnaireDTO[];
  listVehiculeDisponible:IVehicule[];
  actions: any = { canDetail: true ,canModify:false,withAction:true,canAdd:true}
  constructor(private modalService: NgbModal,
    private vehiculeFonctionService:VehiculeFonctionService,
    private fonctionnaireService:FonctionnaireService,
    private vehiculeService:VehiculeService) {
    this.formAffectionVehicule=new FormGroup({
      date:new FormControl('', Validators.required),
      fonctionnaire_id:new FormControl('', Validators.required),
      montant:new FormControl('', Validators.required),
      vehicule:new FormGroup({
        id:new FormControl('', Validators.required),
      })

    })
   }

  ngOnInit() {
this.findAllVehucileFonction();
  }
  findAllVehucileFonction(){
    this.vehiculeFonctionService.pageable(this.currentPage,this.size).subscribe((res:any)=>{
      this.listAffectationVehicule = res.Content;
      this.totalPages=res.totalPages;
    })
  }
  allVehucileDisponible(){
    this.vehiculeService.findAllVehiculeDispponible().subscribe((res : EntityArrayResponseType) =>{
      this.listVehiculeDisponible = res.body 
    })
   } 
   allDirecteur(){
    this.fonctionnaireService.getAllRoleDirecteur().subscribe((res: FonctionnaireArrayResponse) => {
      this.listFonctionnaire = res.body 
    })
   }

  modalAjouterAffectationVehicule(content:any){
    this.allVehucileDisponible();
    this.allDirecteur();
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalDetailAffectationVehicule(content:any,data:any){
/*     this.allVehucileDisponible();
    this.allDirecteur();
    this.formAffectionVehicule.patchValue(data); */
    this.vehiculeFoncion=data;
    this.fonctionnaireService.getFonctionnaireById(data.fonctionnaire_id).subscribe((res: FonctionnaireEntityResponse) => {
      console.log(res)
      this.fonctionnaire = res.body 
      
    })

    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalModifierAffectationVehicule(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  supprimerAffectationVehicule(data:any){

  }

  close(){
    this.modalService.dismissAll();
  }

  supprimerAvancesConvention(data:any){
    Swal.fire({
      title: ' ',
      text: "voulez-vous vraiment supprimer cette Avance convention  ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Fermer'
  
    }).then((result) => {
       if (result.isConfirmed) {
        this.vehiculeFonctionService.delete(data).subscribe(res=>{
          this.ngOnInit();
          Swal.fire({
            title: 'Avance convention à été   supprimé avec succès !',
            icon: 'success',
          });
        },err=>{
          console.log(err)
        })
     
      } 
    })
  }
  affectationVehiculeFonction(value:any){
    console.log(value)
   if(this.formAffectionVehicule.valid){
    this.vehiculeFonctionService.save(value).subscribe(res=>{
      this.modalService.dismissAll();
      Swal.fire({
        title: 'Affectation  a été ajoutée avec succés',
        icon: 'success',
      });
      this.formAffectionVehicule.reset();
    })
   }
  }
  modifierInfoVehiculeFonction(value:any){
    if(this.formAffectionVehicule.valid){
     this.vehiculeFonctionService.update(this.id_vehicule,value).subscribe(res=>{
       Swal.fire({
         title:  'Affectation a été modifié avec succés',
         icon: 'success',
       });
       this.close();
       this.ngOnInit();
       this.formAffectionVehicule.reset();
     })
    }
   }

   pageCurrentChange(event :any){
    this.currentPage=event;
  
    console.log(this.currentPage, this.size)
    this.findAllVehucileFonction();
  }
    sizeCurrentChange(event :any){
      this.size=event;
      this.currentPage=0;
      console.log(this.currentPage, this.size)
      this.findAllVehucileFonction();
     }



}
