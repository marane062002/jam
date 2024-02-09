import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeMisionService } from '../../../../../core/_base/layout/services/parcAuto/demande-mision.service';
import { FormGroup } from '@angular/forms';
import { DemandeMission } from '../../../../../core/_base/layout/models/demande-mission';
import { Article } from '../../../../../core/_base/layout/models/article';
import Swal from 'sweetalert2';
import { ArticleService } from '../../../../../core/_base/layout/services/gestionStock/article.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.scss']
})
export class LivraisonComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  isLoading=false;
  datasize: number = 0;
  livraisonAttente: any[];
  livraisonEffectuee: any[];
  tabID: number = 1;
  missionsNonTraitees: any[];
  actions: any = { canDetail:true,withAction:true}
  missionsTraitees: any[];
  solde:number=0;
  currentPage=0;
  size=5;
  totalPages=1;
  listEntrees:any[];
  listArticle:Article[];
  idsvignettes:string;
  demandeMision:DemandeMission;
  dropdownSettingsArt= {};
  formDemandeMision: FormGroup;
  selectedItems:any[] = [];

  displayedColumns: string[] = [ "numdemande", "dateArriveLettre","dateDepart","dateRetour", "matricule","moyenTransport","actions"]

  constructor(
    private modalService: NgbModal,
    private ArticleService:ArticleService,
    private  translate:TranslateService,
    private demandeMisionService:DemandeMisionService,
    private router:Router) { }

  ngOnInit() {
    this.getallDemandeMisionaffectionVignete();
  }
  

  getallDemandeMisionaffectionVignete(){
    this.demandeMisionService.getallDemandeMisionaffectinCarte(this.currentPage,this.size).subscribe(res=>{
      let data:any=res;
      this.livraisonAttente=data.Content;
      this.totalPages=data.totalPages;
      this.dataSource = new MatTableDataSource( this.livraisonAttente);
      this.isLoading = false;
      this.datasize = data.length;
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
  getallDemandeMisionaLIvrevehucile(){
    this.demandeMisionService.getallDemandeMisionaLIvrevehucile(this.currentPage,this.size).subscribe(res=>{
      let data:any=res;
      this.livraisonAttente=data.Content;
      this.totalPages=data.totalPages;
      this.dataSource = new MatTableDataSource( this.livraisonAttente);
      this.isLoading = false;
      this.datasize = data.length;
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
  

  displayTabs(event) {
    this.dataSource = new MatTableDataSource(null);
    this.currentPage=0,
    this.size=5;
    if(event.index==0){
      this.getallDemandeMisionaffectionVignete();
    }else if(event.index==1){
      this.getallDemandeMisionaLIvrevehucile();
    }
  }
  applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}


  openModalDetaillLivraiAttent(content:any,data:any){
    this.demandeMision=data;
    this.modalService.open(content, {
      size: "lg",
    });
  }

  openModalModiferLivraiAttent(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  supprimerDemandeMission(data:any){

  }

  close(){
    this.modalService.dismissAll();
  }

  livreVehicule(id:number) {
    this.demandeMisionService.livreVehicule(id).subscribe(res=>{
      Swal.fire({
        title: 'Véhicule a été livré avec succés',
        icon: 'success',
      });
      this.modalService.dismissAll();
      this.ngOnInit();
    })
    
  
  }

  rejeteLivraison() {
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
  details(id:number){
    this.router.navigate(
      ["/gestionParcAuto/details-mession"],
      { queryParams: { id: id,phase:4} }
    );
}
  modifierLivraison() {
    this.modalService.dismissAll();
    Swal.fire({
      title: 'Livraison a été modifié avec succés',
      icon: 'success',
    });
  }
  pageCurrentChange(event :any){
    this.currentPage=event;
    if(this.tabID==1){
      this.getallDemandeMisionaffectionVignete();
    }if(this.tabID==2){
    this.getallDemandeMisionaLIvrevehucile();
    }
  }
    sizeCurrentChange(event :any){
      this.size=event;
      if(this.tabID==1){
        this.getallDemandeMisionaffectionVignete();
      }if(this.tabID==2){
   this.getallDemandeMisionaLIvrevehucile();
      }
     }

}
