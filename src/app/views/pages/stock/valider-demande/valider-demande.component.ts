import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DemandeFournitureDTO } from '../../../../core/_base/layout/models/DemandeFournitureDTO';
import { FonctionnaireDTO } from '../../../../core/_base/layout/models/fonctionnaire-dto';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { FonctionnaireArrayResponse } from '../../../../core/_base/layout/services/fonctionnaire.service';
import Swal from 'sweetalert2';
import { DemandeFournitureService } from '../../../../core/_base/layout/services/gestionStock/demande-fourniture.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { currentUser, User } from '../../../../core/auth';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';

@Component({
  selector: 'kt-valider-demande',
  templateUrl: './valider-demande.component.html',
  styleUrls: ['./valider-demande.component.scss']
})
export class ValiderDemandeComponent implements OnInit {
  user : Observable<User>;
  idFonctionniare=0;
  displayedColumns: string[] = [ "numeroDemande", "date","codeAnalytique","Statut","actions"]
  isLoading=true;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  datasize: number = 0;
  listDemande:DemandeFournitureDTO[] = [];
  actions: any = { canDetail: true ,canModify:true,withAction:true}
  //statut de   classment
  enInstance=false;
  traite=false;
  page : any = 1 ;
  pageSize : any = 10;
  tabID=1;
  constructor(
    private route: Router,
    private modalService: NgbModal , 
    private router: Router,
    private translate:TranslateService,
    private store: Store<AppState>,
    private demandeFournitureService : DemandeFournitureService
     ) {
      this.user =  this.store.pipe(select(currentUser));
      }

 async  ngOnInit() {
  await   this.user.subscribe(res=>{
    console.log(res)
      this.idFonctionniare=res.id;
      console.log(this.idFonctionniare)
    })
    this.loadDemandebyUserConnect();
      this.enInstance=false;
      this.traite=false;
  }

  chnagePageEvent(courentpage:number){
    this.page=courentpage;
  }
  applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

  detailsDemande(id:number){
    this.router.navigate(
      ["/gestionStock/detail-demande"],
      { queryParams: { id: id } }
    );
  }
  chnageSizeEvent(event:any){
    this.page=0;
    this.pageSize=event.target.value;
  
  }
  displayTabs(event){
    let id=event.index;
    if(id==0){
      this.loadDemandebyUserConnect();
       this.enInstance=false;
       this.traite=false;
      }else if(id==2){
        
       this.demandeFournitureService.getAllDemandeFournitureByStatusTraitedandIdFonctionnaireNotDeleted(this.idFonctionniare).subscribe((res : FonctionnaireArrayResponse) =>{
         this.listDemande = res.body  ;
         let data = res.body ;
         this.datasize = data.length
         this.dataSource = new MatTableDataSource(data);
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
       this.enInstance=false;
       this.traite=true;
      }else if(id==1){
       this.demandeFournitureService.getAllDemandeFournitureByStatusandFonctionnaireNotDeleted(this.idFonctionniare,8).subscribe((res : FonctionnaireArrayResponse) =>{
         this.listDemande = res.body  ;
         let data = res.body ;
         this.datasize = data.length
         this.dataSource = new MatTableDataSource(data);
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
       this.enInstance=true;
       this.traite=false;
 
      }else if(id==3){ 
       this.loadDemandeValiddetbyUserConnect();
      } 


  }

  telechargeDoucument(id:any){
    this.demandeFournitureService.getBonById(id)
  }

  modalDetailDemande(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalModifierDemande(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  supprimerDemande(data:any){

  }

  close(){
    this.modalService.dismissAll();
  }

  loadDemandebyUserConnect() {
    this.demandeFournitureService.getAllDemandeFournitureByStatusandIdFonctionnaireNotDeleted(this.idFonctionniare).subscribe((res : FonctionnaireArrayResponse) =>{
      let data = res.body ;
      this.datasize = data.length
      this.dataSource = new MatTableDataSource(data);
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

      


loadDemandeValiddetbyUserConnect() {


              this.demandeFournitureService.getAllDemandeFournitureValideByChefServiceNotDeleted(this.idFonctionniare).subscribe((res : FonctionnaireArrayResponse) =>{
                this.listDemande = res.body ;
                let data = res.body ;
                this.datasize = data.length
                this.dataSource = new MatTableDataSource(data);
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
  selectedLangue(event:any){
    let statut:number=event.target.value;
/*     if(statut==1){
      this.loadDemandebyUserConnect();
      
      this.enInstance=false;
      this.traite=false;
     }else if(statut==3){
      this.demandeFournitureService.getAllDemandeFournitureByStatusTraitedandIdFonctionnaireNotDeleted(this.fonctionnaire.id).subscribe((res : FonctionnaireArrayResponse) =>{
        this.listDemande = res.body  ;
      })
      this.enInstance=false;
      this.traite=true;
     }else if(statut==2){
      this.demandeFournitureService.getAllDemandeFournitureByStatusandFonctionnaireNotDeleted(this.fonctionnaire.id,8).subscribe((res : FonctionnaireArrayResponse) =>{
        this.listDemande = res.body ;
      })
      this.enInstance=true;
      this.traite=false;

     } */
    
   
  }
  verifyRole(demande:DemandeFournitureDTO) : void {
/*     console.log(this.fonctionnaire.role.libelle)
    switch(this.fonctionnaire.role.libelle) {
      case 'Chef Division' : {
       demande.code="3";
        break ;
      }
      case 'Chef Logistique' : {
        demande.code="4";

        break ;
        }
      case 'Chef Finance' : {
        demande.code="5";

        break ;
      }
      case 'Chef Service' : {
        demande.code="2";

        break ;
      }
      default:{
        demande.code="1";

      }
    } */
  }
  detail(idDemande  : any) {
    this.route.navigate(["/home/detail-demande"] , {
      queryParams : {
        idDemandeFourniture   :  idDemande
      }
    })
  }
  modifier(idDemande  : any) {
    this.route.navigate(["/home/modifier-demande"] , {
      queryParams : {
        idDemandeFourniture   :  idDemande
      }
    })
  }
 async  TransferDemande(demande  : DemandeFournitureDTO){
    console.log(demande)
  // await  this.verifyRole(demande);
   this.demandeFournitureService.transferDemandeFourniture(demande.id,demande).subscribe(res=>{
    Swal.fire({
      title: 'demande  a été transfer  avec succés',
      icon: 'success',
    });
    this.ngOnInit();
   })
  }

  editChefService(idDemande  : any) {
    this.route.navigate(["/home/validerChefService-demande"] , {
      queryParams : {
        idDemandeFourniture   :  idDemande
      }
    })
  }
  editChefDivision(idDemande  : any) {
    this.route.navigate(["/home/validerChefDivision-demande"] , {
      queryParams : {
        idDemandeFourniture   :  idDemande
      }
    })
  }
  editChefLogistique(idDemande  : any) {
    this.route.navigate(["/home/validerChefLogistique-demande"] , {
      queryParams : {
        idDemandeFourniture   :  idDemande
      }
    })
  }
  editDirecteur(idDemande  : any){
    this.route.navigate(["/home/validerDirecteur-demande"] , {
      queryParams : {
        idDemandeFourniture   :  idDemande
      }
    })
  }
  editChefFinance(idDemande  : any) {
    this.route.navigate(["/home/validerChefFinance-demande"] , {
      queryParams : {
        idDemandeFourniture   :  idDemande
      }
    })
  }
}
