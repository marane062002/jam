import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { FonctionnaireDTO } from '../../../../../core/_base/layout/models/fonctionnaire-dto';
import { LocalStorageService } from 'ngx-webstorage';
import { DemandeMisionService } from '../../../../../core/_base/layout/services/parcAuto/demande-mision.service';
import { DemandeMission } from '../../../../../core/_base/layout/models/demande-mission';
import { ValiderDemandeMissionDTO } from '../../../../../core/_base/layout/models/valider-demande-mission-dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FonctionnaireArrayResponse, FonctionnaireService } from '../../../../../core/_base/layout/services/fonctionnaire.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

import { SousEntiteArrayResponse, SousEntiteService } from '../../../../../core/_base/layout/services/sous-entite.service';
import { ISousEntite } from '../../../../../core/_base/layout/models/sous-entite';

@Component({
  selector: 'validation-mission',
  templateUrl: './validation-mission.component.html',
  styleUrls: ['./validation-mission.component.scss']
})
export class ValidationMissionComponent implements OnInit {
  validerDemandeMissionDTO=new ValiderDemandeMissionDTO();
  fonctionnaire : FonctionnaireDTO =null;// this.localStorege.retrieve("userInfo") as  FonctionnaireDTO ;
  actions: any = { canDetail:true,canAdd: true, canModify: false, canTransfer:false,withAction:true}
  demandesNonTraitee: DemandeMission[];
  demandesEninstance: DemandeMission[];
  listFonctionnaire:FonctionnaireDTO[]=[];
  listFonctionnaireAcc:FonctionnaireDTO[]=[];
  dropdownList: any[] = [];
  page : any = 1 ;
  pageSize : any = 10;
  formDemandeMision: FormGroup;
  demandeMission:DemandeMission;
  demandes: any[]=[];
  demandesRefusee: any[];
  dropdownSettings: IDropdownSettings;
  dropdownSettingsFor= {};
  dropdownSettingsAcom= {};
  dropdownSettingsArt= {};
  public selectedItemsRes :any[]= [];
  public selectedItemsAcc :any[]= [];
  tabID: number = 1;
  idMission=0;
  currentPage=0;
  size=5;
  totalPages=1;
  SousentitelistDTO: ISousEntite[];
  headerData:any=[
    { name: "Numéro", content: "numdemande" },
    { name: "Date arrivée lettre", content: "dateArriveLettre" },
    { name: "Date départ", content: "dateDepart" },
    { name: "Date retour", content: "dateRetour" },
    { name: "Moyen de transport", content: "moyenTransport" },
    { name: "Statut", content: "statusDemande.libelle" }
   
  ]
  constructor(private modalService: NgbModal,private sousEntiteService:SousEntiteService,
    private missionService :DemandeMisionService,private fonctionnaireService :FonctionnaireService) { 
    
    this.formDemandeMision= new FormGroup({
      numdemande: new FormControl(''),
      code: new FormControl(''),
      source: new FormControl(''),
      moyenTransport: new FormControl('',Validators.required),
      entitrBEneficaire: new FormControl('',Validators.required),
      typemIsion: new FormControl('',Validators.required),
      motif: new FormControl('',Validators.required),
      parcours: new FormControl('',Validators.required),
      dateDepart: new FormControl('',Validators.required),
      dateRetour:new FormControl('',Validators.required),
      dateArriveLettre: new FormControl('',Validators.required),
       resbonsable_id :new FormControl('',Validators.required),
      accompagnateurs :new FormControl('',Validators.required),
      fonctionaire_id:new FormControl('',Validators.required),
     accompagnateurs_ids:new FormControl('',),

  })
  }
  ngOnInit() {
  
    this.loadDemandebyUserConnect();
    this.dropdownSettingsAcom = {
      singleSelection: false,
      idField: "id",
      textField: "nom",
      selectAllText: "Tout sélectionner ",
      unSelectAllText: "Tout déselectionner ",
      itemsShowLimit: 3,
      allowSearchFilter: true,
  };
  this.dropdownSettings = {
    singleSelection: true,
    idField: "id",
    textField: "nom",
    selectAllText: "Tout sélectionner ",
    unSelectAllText: "Tout déselectionner ",
    itemsShowLimit: 7,
    allowSearchFilter: true,
};
  
  }
  onItemSelect(item: any) {
    console.log(item);
}
loadSousEntite() : void {
  try {
    
  } catch (error) {
      throwError(error)
  }
}
onItemSelectResponsable(item:any){
  this.formDemandeMision.get("resbonsable_id").setValue(item.id);
  this.listFonctionnaireAcc=this.listFonctionnaire.filter(e=>e.id!=item.id);
  console.log(this.listFonctionnaireAcc)

}
onSelectAll(items: any) {
    console.log(items);
}
  
TransferDemande(idDemande :number){
  let statut=0;
   switch(this.fonctionnaire.role.libelle) {
    case 'Chef Division' : {
      console.log("Chef Devision")
 
      statut=3;
      break ;
    }
    case 'Chef Logistique' : {
      statut=4;

      break ;
      }
    case 'Chef Finance' : {
      statut=6;

      break ;
    }
    case 'Chef Service' : {
      statut=2;

      break ;
    }
    default:{
      statut=1;

    }
  }
  this.missionService.TransfertMission(idDemande, statut).subscribe(res=>{
    Swal.fire({
      title: 'Mission a été transfer  avec succés',
      icon: 'success',
    });
    this.ngOnInit();
    this.tabID=1;
  },err=>{
    console.log(err)
  })

}
modalAjouterDemandeMission(content:any){
  this.formDemandeMision.controls['source'].setValue(2);
  this.formDemandeMision.controls['code'].setValue("7");
  this.formDemandeMision.get("fonctionaire_id").setValue(this.fonctionnaire.id);
  this.loadSousEntite();
  this.missionService.getCountDemandeMision().subscribe(res=>{
    let d=new Date()
    this.formDemandeMision.get('numdemande').setValue(res+1+"/"+d.getFullYear());
  })
  this.fonctionnaireService.getAllFonctionnairesparcAuto().subscribe((res: FonctionnaireArrayResponse) => {
    this.listFonctionnaire = res.body  ;
  })
 
  this.modalService.open(content, {
    size: "lg",
    
  });

}
verifyRole() : void {
  console.log(this.fonctionnaire.role.libelle)
  switch(this.fonctionnaire.role.libelle) {
    case 'Chef Division' : {
      console.log("Chef Devision")
 
     this.formDemandeMision.controls['source'].setValue(2);
      this.formDemandeMision.controls['code'].setValue("3");
      break ;
    }
    case 'Chef Logistique' : {
     this.formDemandeMision.controls['source'].setValue(2);
     this.formDemandeMision.controls['code'].setValue("4");

      break ;
      }
    case 'Chef Finance' : {
      this.formDemandeMision.controls['source'].setValue(2);
      this.formDemandeMision.controls['code'].setValue("5");

      break ;
    }
    case 'Chef Service' : {
      this.formDemandeMision.controls['source'].setValue(1);
     this.formDemandeMision.controls['code'].setValue("2");

      break ;
    }
    default:{
      this.formDemandeMision.controls['source'].setValue(1);
     this.formDemandeMision.controls['code'].setValue("1");

    }
  }
}
  loadDemandebyUserConnect() {
    console.log(this.fonctionnaire.role.libelle)
   try {
    this.validerDemandeMissionDTO.user_id=this.fonctionnaire.id || 0;
        switch(this.fonctionnaire.role.libelle) {
        
          case "Agent" : {
           try {
            this.missionService.getallDemandeMisionaByStatusAndFoncionaireNotDeleted(this.fonctionnaire.id,[1,2,3,4,5,6,8,9],this.currentPage,this.size).subscribe((res :any)=>{
              this.demandes = res.Content;
              this.totalPages=res.totalPages;
              this.validerDemandeMissionDTO.code=2;
            })
           } catch (error) {
            throwError(error)
           }
            break;
          }
          case "Chef Service" : {
            try {
              
              this.missionService.getallDemandeMisionaByStatusNotDeleted(1,this.currentPage, this.size).subscribe((res :any) =>{
                this.demandes = res.Content;
                this.totalPages=res.totalPages;
                this.validerDemandeMissionDTO.code=2;
              })
             } catch (error) {
              throwError(error)
             }
            break;
          }
          case "Chef Division" : {
            try {
              this.missionService.getallDemandeMisionaByStatusNotDeleted(2,this.currentPage, this.size).subscribe((res :any) =>{
                this.demandes = res.Content;
                this.totalPages=res.totalPages;
                this.validerDemandeMissionDTO.code=3;
              })
             } catch (error) {
              throwError(error)
             }
            break;
          }
          case "Chef Logistique"  : {
            try {
              this.missionService.getallDemandeMisionaByStatusNotDeleted(4,this.currentPage, this.size).subscribe((res :any) =>{
                this.demandes = res.Content;
                this.totalPages=res.totalPages;
                this.validerDemandeMissionDTO.code=5;
              })
             } catch (error) {
              throwError(error)
             }
            break;
          }
          case "Chef Finance" : {
            try {
              this.missionService.getallDemandeMisionaByStatusNotDeleted(5,this.currentPage, this.size).subscribe((res :any) =>{
                this.demandes = res.Content;
                this.totalPages=res.totalPages;
                this.validerDemandeMissionDTO.code=6;
              })
             } catch (error) {
              throwError(error)
             }
            break;
          } case "Directeur" : {
            try {
              this.missionService.getallDemandeMisionaByStatusNotDeleted(3,this.currentPage, this.size).subscribe((res :any) =>{
                this.demandes = res.Content;
                this.totalPages=res.totalPages;
                this.validerDemandeMissionDTO.code=4;
              })
             } catch (error) {
              throwError(error)
             }
            break;
          }
        }   
      


   } catch (error) {
     throwError(error)
   }
  }
  loadDemandeValidetbyUserConnect() {
    console.log(this.fonctionnaire.role.libelle)
   try {
   
        switch(this.fonctionnaire.role.libelle) {
          case "Chef Service" : {
            try {
              
              this.missionService.getallDemandeMisionVAlideBychefService(this.fonctionnaire.id,this.currentPage, this.size).subscribe((res :any) =>{
                this.demandes = res.Content;
                this.totalPages=res.totalPages;
                this.validerDemandeMissionDTO.code=2;
              })
             } catch (error) {
              throwError(error)
             }
            break;
          }
          case "Chef Division" : {
            try {
              this.missionService.getallDemandeMisionVAlideBychefDivison(this.fonctionnaire.id ,this.currentPage, this.size).subscribe((res :any) =>{
                this.demandes = res.Content;
                this.totalPages=res.totalPages;
                this.validerDemandeMissionDTO.code=3;
              })
             } catch (error) {
              throwError(error)
             }
            break;
          }
          case "Chef Logistique"  : {
            try {
              this.missionService.getallDemandeMisionVAlideBycheflogistique(this.fonctionnaire.id,this.currentPage, this.size).subscribe((res :any) =>{
                this.demandes = res.Content;
                this.totalPages=res.totalPages;
                this.validerDemandeMissionDTO.code=5;
              })
             } catch (error) {
              throwError(error)
             }
            break;
          }
          case "Chef Finance" : {
            try {
              this.missionService.getallDemandeMisionVAlideBychefFinance(this.fonctionnaire.id,this.currentPage, this.size).subscribe((res :any) =>{
                this.demandes = res.Content;
                this.totalPages=res.totalPages;
                this.validerDemandeMissionDTO.code=6;
              })
             } catch (error) {
              throwError(error)
             }
            break;
          } case "Directeur" : {
            try {
              this.missionService.getallDemandeMisionVAlideByDirecteur(this.fonctionnaire.id,this.currentPage, this.size).subscribe((res :any) =>{
                this.demandes = res.Content;
                this.totalPages=res.totalPages;
                this.validerDemandeMissionDTO.code=4;
              })
             } catch (error) {
              throwError(error)
             }
            break;
          }
        }   
      


   } catch (error) {
     throwError(error)
   }
  }
  getallDemandeMisionaByStatusAndFoncionaireNotDeleted(){
    this.missionService.getallDemandeMisionaByStatusAndFoncionaireNotDeleted(this.fonctionnaire.id,[6,8],this.currentPage,this.size).subscribe((res :any)=>{
      this.demandes=res.Content
      this.totalPages=res.totalPages;
    })
  }
  telechargeDoucument(id:number){
    this.missionService.generateDocumentMession(id);
  }

  chnageSizeEvent(event:any){
    console.log(event)
    this.size=event.target.value;
    this.currentPage=0;
    this.actions.canModify=false;
    this.actions.canTransfer=false;
    if(this.tabID===2){
      this.getallDemandeMisionaByStatusAndFoncionaireNotDeleted();
      this.actions.canModify=false;
    }else if (this.tabID===4){
      this.actions.canModify=true;
      this.actions.canTransfer=true;
      this.missionService.getallDemandeMisionaByStatusAndFoncionaireNotDeleted(this.fonctionnaire.id,7,this.currentPage,this.size).subscribe((res :any)=>{
        this.demandes=res.Content
        this.totalPages=res.totalPages;
      })
    }else if(this.tabID===1){
      this.loadDemandebyUserConnect();
    }else if(this.tabID===3){
      this.loadDemandeValidetbyUserConnect();
    }
  }
  chnagePageEvent(value:number){
    this.currentPage=value;
    this.actions.canModify=false;
    this.actions.canTransfer=false;
    if(this.tabID===2){
      this.getallDemandeMisionaByStatusAndFoncionaireNotDeleted();
      this.actions.canModify=false;
    }else if (this.tabID===4){
      this.actions.canModify=true;
      this.actions.canTransfer=true;
      this.missionService.getallDemandeMisionaByStatusAndFoncionaireNotDeleted(this.fonctionnaire.id,7,this.currentPage,this.size).subscribe((res :any)=>{
        this.demandes=res.Content
        this.totalPages=res.totalPages;
      })
    }else if(this.tabID===1){
      this.loadDemandebyUserConnect();
    }else if(this.tabID===3){
      this.loadDemandeValidetbyUserConnect();
    }
  }
  displayTab(id: number) {
    console.log(id)
    this.tabID = id;
    this.actions.canModify=false;
    this.actions.canTransfer=false;
    if(this.tabID===2){
      this.getallDemandeMisionaByStatusAndFoncionaireNotDeleted();
      this.actions.canModify=false;
    }else if (this.tabID===4){
      this.actions.canModify=true;
      this.actions.canTransfer=true;
      this.missionService.getallDemandeMisionaByStatusAndFoncionaireNotDeleted(this.fonctionnaire.id,7,this.currentPage,this.size).subscribe((res :any)=>{
        this.demandes=res.Content
        this.totalPages=res.totalPages;
      })
    }else if(this.tabID===1){
      this.loadDemandebyUserConnect();
    }else if(this.tabID===3){
      this.loadDemandeValidetbyUserConnect();
    }
  }

  openModalDetaillLivraiAttent(content:any,data:any){
    console.log(data)

    this.demandeMission=data;
    this.validerDemandeMissionDTO.demande_id=data.id;
       this.modalService.open(content, {
      size: "lg",
    });
  }

  modifierDemande(content:any,data:any){
    console.log(data)
    this.idMission=data.id;
    this.formDemandeMision.patchValue(data);
 
    let  ids:number[]=data.accompagnateurs_ids.split(",")
    console.log(ids)
      this.fonctionnaireService.getAllFonctionnairesparcAuto().subscribe((res: FonctionnaireArrayResponse) => {
    this.listFonctionnaire = res.body  ;
    this.listFonctionnaireAcc=this.listFonctionnaire.filter(e=>e.id!=data.resbonsable_id);
    let user = this.listFonctionnaire.find(e=>e.id==data.resbonsable_id);
    ids.forEach(el=>{
      let u = this.listFonctionnaire.find(e=>e.id==el);
      this.selectedItemsAcc.push({ id: u.id, nom: u.nom },)
    })
   // let userAcc= this.listFonctionnaire.filter(e=>ids.indexOf(e.id?e.id:0)>-1);
    this.formDemandeMision.get("accompagnateurs").setValue(this.selectedItemsAcc)
    this.selectedItemsRes=[ { id: user.id, nom: user.nom },]
    console.log(this.selectedItemsRes)
  })
  
    this.modalService.open(content, {
      size: "lg",
    });
  }

  supprimerDemandeMission(data:any){

  }

  close(){
    this.modalService.dismissAll();
  }

  updateMisssion(value:DemandeMission){
      value.accompagnateurs_ids=value.accompagnateurs.map(e=>e.id).toString();
  if(this.formDemandeMision.valid){
    this.missionService.update(this.idMission,value).subscribe(res=>{
      console.log(res);
      this.close();
      this.tabID=1;
      this.ngOnInit(); 
  Swal.fire({
    title: 'Mission a été ajoutée avec succés',
    icon: 'success',
  });
    },err=>{
      console.log(err)
    })
  }else{
    const controls = this.formDemandeMision.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          console.log(name)
        }
  }}
  

}
  ajouterMission(value:DemandeMission) {
 
    value.accompagnateurs_ids=value.accompagnateurs.map(e=>e.id).toString();
    if(this.formDemandeMision.valid){
      this.missionService.save(value).subscribe(res=>{
        console.log(res);
        this.close();
        this.ngOnInit(); 
        this.tabID=1;
    Swal.fire({
      title: 'Mission a été ajoutée avec succés',
      icon: 'success',
    });
      },err=>{
        console.log(err)
      })
    }else{
      const controls = this.formDemandeMision.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
            console.log(name)
          }
    }}
    
  
  }
  validerMission() {
   
    console.log(this.validerDemandeMissionDTO)
    this.missionService.validerMision(this.validerDemandeMissionDTO).subscribe(res=>{
      this.modalService.dismissAll();
      this.ngOnInit();
     Swal.fire({
        title: 'Mission a été validée avec succés',
        icon: 'success',
      });
    },err=>{
      console.log(err)
    });
   
  }

  AmodifierMission(){
      
    Swal.fire({
      title: '',
      text: 'Veuillez saisir un motif de demande la modification ',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'rejeter',
    showLoaderOnConfirm: true,
  
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      this.validerDemandeMissionDTO.textReject=result.value;
      this.validerDemandeMissionDTO.code=9;
      this.missionService.validerMision(this.validerDemandeMissionDTO).subscribe(res=>{
        this.ngOnInit();
        this.modalService.dismissAll();
        Swal.fire({
          title: 'Mission a été change statut   avec succés',
          icon: 'success',
        });
      })
      
      console.log(result.value)
    }
  })
    
  }
  rejeteMission() {
  
    Swal.fire({
      title: '',
      text: 'Veuillez saisir un motif de rejet',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'rejeter',
    showLoaderOnConfirm: true,
  
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      this.validerDemandeMissionDTO.textReject=result.value;
      this.validerDemandeMissionDTO.code=8;
      this.missionService.validerMision(this.validerDemandeMissionDTO).subscribe(res=>{
        this.ngOnInit();
        Swal.fire({
          title: 'Mission a été rejetée avec succés',
          icon: 'success',
        });
      })
      this.modalService.dismissAll();
      console.log(result.value)
    }
  })
  }

  modifierMission() {
    this.modalService.dismissAll();
    Swal.fire({
      title: 'Mission a été modifié avec succés',
      icon: 'success',
    });
  }
  pageCurrentChange(event :any){
    this.currentPage=event;
    if(this.tabID==1){
      this.loadDemandebyUserConnect();
    }if(this.tabID==2){

    }
    //this.getallDemandeMisionaffectionVoiture();
  }
    sizeCurrentChange(event :any){
      this.size=event;
      if(this.tabID==1){
        this.loadDemandebyUserConnect();
      }if(this.tabID==2){

      }
     // this.getallDemandeMisionaffectionVoiture();
     }
}
