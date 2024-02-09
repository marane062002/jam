import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DemandeMission } from '../../../../../core/_base/layout/models/demande-mission';
import { FormGroup } from '@angular/forms';
import { DemandeMisionService } from '../../../../../core/_base/layout/services/parcAuto/demande-mision.service';
import { Article } from '../../../../../core/_base/layout/models/article';
import { ArticleService } from '../../../../../core/_base/layout/services/gestionStock/article.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {

  receptionEnAttente: any[];
  receptionEffectuee: any[];
  tabID: number = 1;
  livraisonAttente: any[];
  livraisonEffectuee: any[];
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
  isLoading=true;

  dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  datasize: number = 0;
  constructor(
    private modalService: NgbModal,
    private ArticleService:ArticleService,
    private translate:TranslateService,
    private demandeMisionService:DemandeMisionService,
    private router:Router) { }

  ngOnInit() {
    this.getallDemandeMisionaLivrevehucile();
 
  }
  applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

  

  displayTabs(event) {
    this.tabID = event.index;
    if(this.tabID==0){
      this.getallDemandeMisionaLivrevehucile();
    }else if(this.tabID==1){
      this.getallDemandeMisionReception();
    }
  }
  getallDemandeMisionaLivrevehucile(){
    this.demandeMisionService.getallDemandeMisionaLIvrevehucile(this.currentPage,this.size).subscribe(res=>{
      let data:any=res;
      this.receptionEnAttente=data.Content;
      this.totalPages=data.totalPages;
      this.datasize = this.receptionEnAttente.length
      this.dataSource = new MatTableDataSource(this.receptionEnAttente);
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
  getallDemandeMisionReception(){
    this.demandeMisionService.getallDemandeMisionReception(this.currentPage,this.size).subscribe(res=>{
      let data:any=res;
      this.receptionEnAttente=data.Content;
      this.totalPages=data.totalPages;
      this.receptionEnAttente=data.Content;
      this.totalPages=data.totalPages;
      this.datasize = this.receptionEnAttente.length
      this.dataSource = new MatTableDataSource(this.receptionEnAttente);
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
  openModalDetaillReception(item:any){
    this.router.navigate(["/home/gestion-parc-auto/detail-reception"] , {
      queryParams : {
        id   :  item.id
      }
    })
  }

  openModalModiferReception(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  close(){
    this.modalService.dismissAll();
  }
  details(id:number){
    this.router.navigate(
      ["/gestionParcAuto/detail-reception"],
      { queryParams: { id: id } }
    );
}
  
  modifierInfoReception() {
    this.modalService.dismissAll();
    Swal.fire({
      title: 'Réception a été modifié avec succés',
      icon: 'success',
    });
  }
  pageCurrentChange(event :any){
    this.currentPage=event;
    if(this.tabID==1){
      this.getallDemandeMisionaLivrevehucile();
    }if(this.tabID==2){
      this.getallDemandeMisionReception();    }
  }
    sizeCurrentChange(event :any){
      this.size=event;
      this.currentPage=0;
      if(this.tabID==1){
        this.getallDemandeMisionaLivrevehucile();
      }if(this.tabID==2){
        this.getallDemandeMisionReception();
      }
     }

}
