import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeMisionService } from '../../../../../core/_base/layout/services/parcAuto/demande-mision.service';
import { DemandeMission } from '../../../../../core/_base/layout/models/demande-mission';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarteJawaz } from '../../common/models/carte-jawaz.model';
import { ArticleService } from '../../../../../core/_base/layout/services/gestionStock/article.service';
import { Article } from '../../../../../core/_base/layout/models/article';
import { SoucheService } from '../../../../../core/_base/layout/services/parcAuto/souche.service';

@Component({
  selector: 'app-detail-reception',
  templateUrl: './detail-reception.component.html',
  styleUrls: ['./detail-reception.component.scss']
})
export class DetailReceptionComponent implements OnInit {

  tabID: number = 1;
  id=0;
  soldeConsome=0;
  vignettes: Article []
  vignettesDisabled: any [];
 listAccessoireVehicule:any[];
  vignettesEnabled: any []
  carbuCartes:any[]
  carteJawaz:CarteJawaz
  formDemandeMision:FormGroup
  formSouche:FormGroup;
  demandeMission:DemandeMission;
  constructor(private modalService: NgbModal,private activatedRoute:ActivatedRoute,private fb:FormBuilder,
   // private statusAccessioreVehiculeService:StatusAccessioreVehiculeService,
    private missionService:DemandeMisionService,private articleService:ArticleService,private soucheService:SoucheService,
    private router:Router) { 
      this.formDemandeMision= new FormGroup({
        id_misssion :new FormControl('',Validators.required),
        compteur: new FormControl('',Validators.required),
        dateReception: new FormControl('',Validators.required),
        observation: new FormControl('',Validators.required),
        etat: new FormControl('',Validators.required),
        soldeCarteJawaz:new FormControl('',Validators.required),
        soldeConsome:new FormControl('',Validators.required),
    })
    this.formSouche = this.fb.group({
      souches:this.fb.array([])
    })
    }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params["id"];
      this.formDemandeMision.get('id_misssion').setValue(this.id);
      this.getOneMission(this.id);
    })


  }
 
  
  soldeCarteJawaz=0;
  getOneMission(id:number){
    this.missionService.getById(id).subscribe(res=>{
      this.demandeMission=res;
      console.log(this.demandeMission.dateReception)
      this.soldeConsome=this.demandeMission.soldeConsome;
      if(this.demandeMission.dateReception==null){
        this.formDemandeMision.get('dateReception').setValue(new Date());
      }else
      this.formDemandeMision.get('dateReception').setValue(new Date(this.demandeMission.dateReception).toISOString().substring(0,10));
      this.formDemandeMision.get('observation').setValue(this.demandeMission.observations);
      this.formDemandeMision.get('compteur').setValue(this.demandeMission.vehicule.compteur);
      this.formDemandeMision.get('etat').setValue(this.demandeMission.vehicule.statutVehicule);
      
      this.formDemandeMision.get("soldeCarteJawaz").setValue(this.demandeMission.carteJawaz.soldeactuel);
      this.soldeCarteJawaz=this.demandeMission.carteJawaz.soldeactuel ||0;
      this.carteJawaz=this.demandeMission.carteJawaz;
      this.getAllSoucheByMission(id);
      this.findVignette(this.demandeMission.vignette_ids);
    

    },err=>{
      console.log(err)
    })
  }
  getAllSoucheByMission(id:number){
    this.soucheService.all(id).subscribe(res=>{
      this.formSouche.setControl('souches', this.setSouches(res)); 

    })

  }
/*   deleteAccessoire(status:StatusAccessiorevehicule){
    console.log(status)
    Swal.fire({
      title: ' ',
      text: "voulez-vous vraiment supprimer ce Accessoire ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Fermer'

    }).then((result) => {
      if (result.isConfirmed) {
        this.statusAccessioreVehiculeService.delete(status.id).subscribe(res=>{
          Swal.fire({
            title: 'Accessoire  supprimé avec succès !',
            icon: 'success',
          });
        },err=>{
    
        })
      }
    })
  
  } */
  setSouches(services:any[]): FormArray
  {
    const formArray = new FormArray([]);
    services.forEach(item => {
      console.log(item)
      formArray.push(this.fb.group({
        id:item.id,
        demandeMission:this.fb.group({
          id: item.demandeMission.id,
        }),
      
        reference:item.reference,
        montant:item.montant,
        dateSouche:item.dateSouche,
       
      }));
    });
  
    return formArray;
  }
  deleteVignette(item:any){

    this.soldeConsome-=item.prix;
    console.log(this.soldeConsome)
    this.articleService.updateStatusVignette(item.id).subscribe(res=>{
      console.log(res);
      this.findVignette(this.demandeMission.vignette_ids);
    },err=>{
      console.log(err)
    })
  }
  onchangeSoldeCarte(event:any){
    console.log();
    this.formDemandeMision.get("soldeCarteJawaz").setValue(event.target.value);


  }

  findVignette(ids:String){
    this.articleService.findAllByids(ids).subscribe(res=>{
      this.vignettes=res;
      this.vignettesDisabled=this.vignettes.filter(e=>e.active ==null ||e.active ==false);
      this.vignettesEnabled=this.vignettes.filter(e=>e.active);
      
    },err=>{
      console.log(err)
    })
  }
  
  displayTab(id: number) {
    this.tabID = id+1;
    if(this.tabID==2){
    
  //    this.addSuches();
    }if(this.tabID==4){
 /*       this.statusAccessioreVehiculeService.findAllByVehiculeAndStatus(this.demandeMission.vehicule.id || 0).subscribe(res=>{
        this.listAccessoireVehicule=res;
      })  */
    }
  }
  soucheArray() : FormArray {
    return this.formSouche.get("souches") as FormArray

  }
  deleteArticle(index:number){
    this.soucheArray().removeAt(index);
  }
 
  submitSouche(){

  }
     
  addSuches() {
    let souche= this.fb.group({
      demandeMission: new FormGroup({
        id: new FormControl(this.demandeMission.id,Validators.required),
      }),
      reference: new FormControl('',Validators.required),
      dateSouche: new FormControl('',Validators.required),
      montant: new FormControl('',Validators.required)
    })
    
    this.soucheArray().push(souche)

}
SouvgarderSouche(){
  this.soucheService.save(this.formSouche.get("souches").value).subscribe(res=>{
    Swal.fire({
      title: 'les souche ont été sauvegardé avec succés',
      icon: 'success',
    });
  },err=>{
    console.log(err)
  })
  console.log(this.formSouche.value)

}

  openModalAjouterVignettes(content:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  openModalAjouterCarburant(content:any){
    this.modalService.open(content, {
      size: "xl",
    });
  }

  openModalModifierCarburant(content:any){
    this.modalService.open(content, {
      size: "xl",
    });
  }

  openModalModifierVignettes(content:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  close(){
    this.modalService.dismissAll();
  }

  receptionner(){
    console.log(this.formDemandeMision.value)
    this.formDemandeMision.get("soldeConsome").setValue(this.soldeConsome);
    if(this.formDemandeMision.valid){
      this.missionService.ReceptionVihucle(this.formDemandeMision.value).subscribe(res=>{
        this.router.navigateByUrl('/home/gestion-parc-auto/reception')
        Swal.fire({
          title: 'Véhicule a été Réceptionné avec succés',
          icon: 'success',
        });
      })
    }
  
  }

}
