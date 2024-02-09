import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Article } from '../../../../../../core/_base/layout/models/article';
import { ArticleService } from '../../../../../../core/_base/layout/services/gestionStock/article.service';
import Swal from 'sweetalert2';
import { ValiderDemandeMissionDTO } from '../../../../../../core/_base/layout/models/valider-demande-mission-dto';
import { NonValideMissionDTO } from '../../../../../../core/_base/layout/models/NonValideMisssionDTO';

import { DemandeMisionService } from '../../../../../../core/_base/layout/services/parcAuto/demande-mision.service';
import { ICarteCarbucarte } from '../../../common/models/carte-carbucarte.model';
import { IVehicule } from '../../../common/models/vehicule.model';
import { CarteJawazService } from '../../../parametrage/cartes-jawaz/service/carte-jawaz.service';
import { EntityArrayResponseType, VehiculeService } from '../../../parametrage/vehicules/services/vehicule.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-details-demande',
  templateUrl: './details-demande.component.html',
  styleUrls: ['./details-demande.component.scss']
})
export class DetailsDemandeComponent implements OnInit {
id:number;
demande:any;
phase=0;

NonvalideMission= new NonValideMissionDTO();

validerDemandeMissionDTO=new ValiderDemandeMissionDTO();
listVehiculeDisponible:IVehicule[]=[];
listArticle:Article[]=[];
  constructor(private modalService: NgbModal,
    private route : Router , 
    //private statusAccessioreVehiculeService:StatusAccessioreVehiculeService,
    private activatedRoute : ActivatedRoute,
    private missionService:DemandeMisionService,
    private carteJawazservice:CarteJawazService,
    private vehiculeService:VehiculeService,
    private translate : TranslateService,
    private articleService:ArticleService
  ) { }
 
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params["id"];
      this.phase=params["phase"];
      if(this.id ==0) {
        this.route.navigateByUrl("/");
      }else{
        this.loadDemandeDetails(this.id);
        this.allVehucileDisponible();
        this.allCartsDisponible();
        this.findAllVignete();
      }
    })
  }
  loadDemandeDetails(id:number){
    this.missionService.getById(id).subscribe(res=>{
      this.demande=res;
    })
  }
  textRejtee:any

  close(){
    this.modalService.dismissAll();
  }

  NonValide(){
    this.NonvalideMission.id=this.id;
    this.NonvalideMission.textRejtee=this.textRejtee;
   this.missionService.rejetDemandeMission(this.NonvalideMission).subscribe(res=>{
      console.log(res)

     Swal.fire({
        title: 'Mission a été Rejeter avec succés',
        icon: 'success',
      });
    },err=>{

      console.log(err)
    });
  }

  modalModifierTransfert(content:any,data:any){
    console.log(data)

    // this.fournisseur=data;
    this.modalService.open(content, {
      size: "xl",
    });
  }

  valide(){
    this.validerDemandeMissionDTO.demande_id=this.id;
    this.validerDemandeMissionDTO.code=6;
    this.validerDemandeMissionDTO.user_id=1;
    this.missionService.validerMision(this.validerDemandeMissionDTO).subscribe(res=>{
      console.log(res)
     Swal.fire({
        title: 'Mission a été validée avec succés',
        icon: 'success',
      });
    },err=>{
      console.log(err)
    });
  }
  telechargeDoucument(id){
    this.missionService.generateDocumentMession(this.id);
  }

/*******************************  afectation voiture****************************************** */

vehicule_id=0;
  statusAccessoireVehicules: any[] = [];
  selectedAccesoire: any[] = [];
  findAllAccessoireByVehicule(event:any){
    this.selectedAccesoire=[];
  /*   this.statusAccessioreVehiculeService.findAllByVehicule(event.target.value).subscribe(res=>{
      this.statusAccessoireVehicules=res.map(e=>new StatusAccessiore(e));
      console.log(this.statusAccessoireVehicules)
    }) */
  }



affectationVehicule() {
  this.missionService.affectionVehicule(this.id,this.vehicule_id, this.statusAccessoireVehicules).subscribe(res=>{
    Swal.fire({
      title: 'Véhicule a été affecté avec succés',
      icon: 'success',
    });

  },err=>{
    console.log(err)
  })
}

allVehucileDisponible(){
  this.vehiculeService.findAllVehiculeDispponible().subscribe((res : EntityArrayResponseType) =>{
    this.listVehiculeDisponible = res.body  ;
    
  })
 } 
/*******************************  afectation carte jawaz****************************************** */
carte_id=0;
listCartejawz:ICarteCarbucarte[]=[];
affectionCarteJawaz(demande_id:number) {
  this.missionService.affectionCarteJawaz(this.id,this.carte_id).subscribe(res=>{
    console.log(res);
    Swal.fire({
      title: 'Véhicule a été affecté avec succés',
      icon: 'success',
    });
  },err=>{
    console.log(err)
  })
 
}
findAllVignete(){
  this.articleService.findAllVignetes().subscribe(res=>{
    console.log(res)
 //   let data:any=res;
    this.listArticle=res;
  //  this.totalPages=data.totalPages;
  },err=>{
    console.log(err)
  })
}
/************************* affecation vignette************** */
solde:number=0;
idsvignettes:string;
selectedItems
affectionVignete() {
  console.log(this.selectedItems);
  this.idsvignettes=this.selectedItems.map(e=>e.id).toString();
  this.solde=this.selectedItems.map(e=>e.prix).reduce((a, b) => a + b, 0);
   this.missionService.affectionvignette(this.id,this.idsvignettes, this.solde).subscribe(res=>{
     console.log(res)
     Swal.fire({
       title: 'Vignette  a été affecté avec succés',
       icon: 'success',
     }); 
     this.articleService.updateVignetteStatus(this.idsvignettes).subscribe(res=>{
      console.log(res);
     },err=>{
      console.log(err)
     })
     this.ngOnInit();
   },err=>{
     console.log(err)
   })

 }
allCartsDisponible(){
  this.carteJawazservice.all().subscribe((res : EntityArrayResponseType) =>{
    this.listCartejawz = res.body  ;
  })
 } 

 /************* livrision vioture***** */
 livreVehicule() {
  this.missionService.livreVehicule(this.id).subscribe(res=>{
    Swal.fire({
      title: 'Véhicule a été livré avec succés',
      icon: 'success',
    });
   // this.ngOnInit();
  })
  

}


}
