import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable, throwError } from 'rxjs';
import { FonctionnaireDTO } from '../../../../../core/_base/layout/models/fonctionnaire-dto';
import { ValiderDemandeMissionDTO } from '../../../../../core/_base/layout/models/valider-demande-mission-dto';
import { FonctionnaireArrayResponse, FonctionnaireService } from '../../../../../core/_base/layout/services/fonctionnaire.service';
import { ReparationServiceService } from '../../../../../core/_base/layout/services/parcAuto/reparation-service.service';
import { Reparation } from '../../../../../core/_base/layout/models/parcAUto/reparation';
import { VehiculeService } from '../../parametrage/vehicules/services/vehicule.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { currentUser, User } from '../../../../../core/auth';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'reparation',
  templateUrl: './reparation.component.html',
  styleUrls: ['./reparation.component.scss']
})
export class ReparationComponent implements OnInit {
  displayedColumns: string[] = [ "vehicule", "date","commentaire","Statut", "actions"]
  isLoading=true;

  dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  datasize: number = 0;
  reparationEnCours: any[];
  listVehucile: any[];
  reparations: any[]= [];
  reparationEffectuee: any[];
  reparationAccepte: any[];
  validerDemandeMissionDTO=new ValiderDemandeMissionDTO();
  fonctionnaire : FonctionnaireDTO ;//= this.localStorege.retrieve("userInfo") as  FonctionnaireDTO ;
  actions: any = { canDetail:true,canAdd: true, canModify: false, canTransfer:false,withAction:true}
  demandesNonTraitee: Reparation[];
  demandesEninstance: Reparation[];
  listFonctionnaire:FonctionnaireDTO[]=[];
  listFonctionnaireAcc:FonctionnaireDTO[]=[];
  dropdownList: any[] = [];
  page : any = 1 ;
  pageSize : any = 10;

  reparation:Reparation;

  user : Observable<User>;
  idFonctionniare=0;
  tabID: number = 1;
  idMission=0;
  currentPage=0;
  size=5;
  totalPages=1;

  constructor(private modalService: NgbModal,
    private serviceVihucle:VehiculeService,
    private store: Store<AppState>,
    private router:Router,
    private reparationService :ReparationServiceService,private  translate:TranslateService) { 
      this.user=  this.store.pipe(select(currentUser));
 
  }
  async ngOnInit() {
  await  this.user.subscribe(res=>{
      this.idFonctionniare=res.id;
    })
    this.loadDemandebyUserConnect();

  
  }
  applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}



  addNow(){
    this.router.navigateByUrl("/gestionParcAuto/new-reparation");
  }

  detailsReparation(id){
    this.router.navigate(
      ["/gestionParcAuto/deatils-reparation"],
      { queryParams: { id: id } }
    );
  }

modifierInfoReparation() {
  this.modalService.dismissAll();
  Swal.fire({
    title: 'Réparation a été modifié avec succés',
    icon: 'success',
  });
}

openModalAjouterReparation(content:any){
  //this.formReparation.get('fonctionaire_id').setValue(this.fonctionnaire.id)

  this.modalService.open(content, {
    size: "lg",
  });
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
  this.reparationService.TransfertMission(idDemande, statut).subscribe(res=>{
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

  this.modalService.open(content, {
    size: "lg",
    
  });

}

  loadDemandebyUserConnect() {

            this.reparationService.getallDemandeMisionaByStatusAndFoncionaireNotDeleted(this.idFonctionniare,[1,2,3,4,5,6],this.currentPage,this.size).subscribe((res :any)=>{
              this.reparations = res.Content;
              this.totalPages=res.totalPages;
              this.validerDemandeMissionDTO.code=1;
              this.datasize = this.reparations.length
              this.dataSource = new MatTableDataSource(this.reparations);
              this.isLoading = false;
              this.paginator._intl.itemsPerPageLabel = this.translate.instant(
                "PAGES.GENERAL.ITEMS_PER_PAGE_LABEL"
              );
              this.paginator._intl.nextPageLabel = this.translate.instant(
                "PAGES.GENERAL.NEXT_PAGE_LABEL"
              );
              this.paginator._intl.previousPageLabel = this.translate.instant(
                "PAGES.GENERAL.PREVIOUS_PAGE_LABEL"
              );
              this.paginator._intl.lastPageLabel = this.translate.instant(
                "PAGES.GENERAL.LAST_PAGE_LABEL"
              );
              this.paginator._intl.firstPageLabel = this.translate.instant(
                "PAGES.GENERAL.FIRST_PAGE_LABEL"
              );
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            })
           
      


  
  }
  loadDemandeValidetbyUserConnect() {
    console.log(this.fonctionnaire.role.libelle)
   try {
   
        switch(this.fonctionnaire.role.libelle) {
          case "Chef Service" : {
            try {
              
              this.reparationService.getallDemandeMisionVAlideBychefService(this.fonctionnaire.id,this.currentPage, this.size).subscribe((res :any) =>{
                this.reparations= res.Content;
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
              this.reparationService.getallDemandeMisionVAlideBychefDivison(this.fonctionnaire.id ,this.currentPage, this.size).subscribe((res :any) =>{
                this.reparations = res.Content;
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
              this.reparationService.getallDemandeMisionVAlideBycheflogistique(this.fonctionnaire.id,this.currentPage, this.size).subscribe((res :any) =>{
                this.reparations = res.Content;
                this.totalPages=res.totalPages;
                this.validerDemandeMissionDTO.code=4;
              })
             } catch (error) {
              throwError(error)
             }
            break;
          }
          case "Chef Finance" : {
            try {
              this.reparationService.getallDemandeMisionVAlideBychefFinance(this.fonctionnaire.id,this.currentPage, this.size).subscribe((res :any) =>{
                this.reparations = res.Content;
                this.totalPages=res.totalPages;
                this.validerDemandeMissionDTO.code=5;
              })
             } catch (error) {
              throwError(error)
             }
            break;
          } /* case "Directeur" : {
            try {
              this.reparationService.getallDemandeMisionVAlideByDirecteur(this.fonctionnaire.id,this.currentPage, this.size).subscribe((res :any) =>{
                this.demandes = res.Content;
                this.totalPages=res.totalPages;
                this.validerDemandeMissionDTO.code=4;
              })
             } catch (error) {
              throwError(error)
             }
            break;
          } */
        }   
      


   } catch (error) {
     throwError(error)
   }
  }
  getallDemandeMisionaByStatusAndFoncionaireNotDeleted(){
    this.reparationService.getallDemandeMisionaByStatusNotDeleted(5,this.currentPage,this.size).subscribe((res :any)=>{
      this.reparations=res.Content
      this.totalPages=res.totalPages;
    })
  }
  telechargeDoucument(id:number){
    this.reparationService.generateDocumentMession(id);
  }


  displayTabs(event) {
    this.tabID = event.index;
    this.actions.canModify=false;
    this.actions.canTransfer=false;
    if(this.tabID===2){
      this.getallDemandeMisionaByStatusAndFoncionaireNotDeleted();
      this.actions.canModify=false;
    }else if (this.tabID===4){
      this.actions.canModify=true;
      this.actions.canTransfer=true;
      this.reparationService.getallDemandeMisionaByStatusAndFoncionaireNotDeleted(this.fonctionnaire.id,7,this.currentPage,this.size).subscribe((res :any)=>{
        //this.demandes=res.Content
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

    this.reparation=data;
    this.validerDemandeMissionDTO.demande_id=data.id;
       this.modalService.open(content, {
      size: "lg",
    });
  }

  modifierDemande(content:any,data:any){
    this.idMission=data.id;
   // this.formReparation.patchValue(data);


/*       this.fonctionnaireService.getAllFonctionnairesparcAuto().subscribe((res: FonctionnaireArrayResponse) => {
    this.listFonctionnaire = res.body;
    let user = this.listFonctionnaire.find(e=>e.id==data.resbonsable_id);

  }) */
    this.modalService.open(content, {
      size: "lg",
    });
  }

  supprimerDemandeMission(data:any){

  }

  close(){
    this.modalService.dismissAll();
  }
/*
  updateMisssion(value:DemandeMission){
      value.accompagnateurs_ids=value.accompagnateurs.map(e=>e.id).toString();
  if(this.formReparation.valid){
    this.reparationService.update(this.idMission,value).subscribe(res=>{
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
    const controls = this.formReparation.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          console.log(name)
        }
  }}
  

}
ajouterInfoReparation(value:Reparation) {
 
    console.log(value)
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
 
  */

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
      this.reparationService.validerMision(this.validerDemandeMissionDTO).subscribe(res=>{
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
      this.reparationService.validerMision(this.validerDemandeMissionDTO).subscribe(res=>{
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

  validerReparation() {
    console.log(this.validerDemandeMissionDTO)
    this.reparationService.validerMision(this.validerDemandeMissionDTO).subscribe(res=>{
      this.modalService.dismissAll();
      this.ngOnInit();
     Swal.fire({
        title: 'Réparation a été validée avec succés',
        icon: 'success',
      });
    },err=>{
      console.log(err)
    });
  }

  rejeteReparation() {
    this.modalService.dismissAll();
    Swal.fire({
      title: '',
      text: 'Veuillez saisir un motif de rejet',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Retourner',
      cancelButtonText: 'Annuler',
      html:
        '<div class="col-md-12"><p> <label class="float-left">Motif de retour <span class="text-danger">*</span></label> <textarea class="form-control" rows="3"></textarea> </p></div>',
    })
  }

}
