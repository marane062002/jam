import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeMisionService } from '../../../../../core/_base/layout/services/parcAuto/demande-mision.service';
import { FormGroup } from '@angular/forms';
import { DemandeMission } from '../../../../../core/_base/layout/models/demande-mission';
import { Article } from '../../../../../core/_base/layout/models/article';
import Swal from 'sweetalert2';
import * as _ from 'lodash'
import { ArticleService } from '../../../../../core/_base/layout/services/gestionStock/article.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'affectation-carburant',
  templateUrl: './affectation-carburant.component.html',
  styleUrls: ['./affectation-carburant.component.scss']
})
export class AffectationCarburantComponent implements OnInit {
  missionsNonTraitees: any[];
  actions: any = { canAffectVignette:true,withAction:true}
  missionsTraitees: any[];
  solde:number=0;
  tabID: number = 1;
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
  dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  isLoading=true;
  displayedColumns = [
		"numdemande",
		"dateArriveLettre", 
		"dateDepart", 
		"moyenTransport",
		"actions",
	];
  datasize=0;
 


  constructor(
    private modalService: NgbModal,
    private articleService:ArticleService,
    private demandeMisionService:DemandeMisionService,
    private router:Router,
    private  translate:TranslateService) { }

  ngOnInit() {
  
    this.getallDemandeMisionaffectinCarte();
    this.dropdownSettingsArt= {
      singleSelection: false,
      enableCheckAll:false,
      noDataAvailablePlaceholderText:"aucune vignettes disponible",
      idField: 'id',
      textField: 'designation',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }
  displayTabs(event) {
    this.tabID=event.index;
    this.currentPage=0;
    this.dataSource = new MatTableDataSource(null);
    if(this.tabID==1){
      this.getallDemandeMisionaffectinCarte();
    }if(this.tabID==2){
      this.getallDemandeMisionaffectionVignete();
    }
  }
  details(id:number){
    this.router.navigate(
      ["/gestionParcAuto/details-mession"],
      { queryParams: { id: id,phase:3} }
    );
  
}
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
  selectArticle(event:any){
    console.log(event);
    let  a = this.listArticle.find(e=>e.id==event.id );
    console.log(a)
   this.solde+=Number(a.prix)|| 0;
   a=undefined;
   console.log(this.solde)
  }
  onDeSelectAll(event:any){
    console.log(event);
    let  article =this.listArticle.find(e=>e.id=event.id);
   this.solde-=Number(article.prix)|| 0;
   console.log(this.solde)
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

  affectedCarteElement(content:any,data:any){
    this.findAllVignete();
    this.demandeMision=data;
    this.solde=data.solde;
 //   this.carte_id =data.carteJawaz!=null ? data.carteJawaz.id:0;
  //  this.soldeactuel=data.carteJawaz!=null ? data.carteJawaz.soldeactuel:0;
      console.log(data);
        this.modalService.open(content, {
          size: "lg",
        }); 
    
  }
  getallDemandeMisionaffectinCarte(){
    this.demandeMisionService.getallDemandeMisionaffectinCarte(this.currentPage,this.size).subscribe(res=>{
      let data:any=res;
      this.missionsTraitees=data.Content;
      this.totalPages=data.totalPages;
      this.missionsTraitees=data.Content;
      this.totalPages=data.totalPages;
      this.totalPages=data.totalPages;
      this.dataSource = new MatTableDataSource( this.missionsTraitees);
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
  
  getallDemandeMisionaffectionVignete(){
    this.demandeMisionService.getallDemandeMisionaffectionVignete(this.currentPage,this.size).subscribe(res=>{
      let data:any=res;
      this.missionsNonTraitees=data.Content;
      this.totalPages=data.totalPages;
      this.missionsTraitees=data.Content;
      this.totalPages=data.totalPages;
      this.totalPages=data.totalPages;
      this.dataSource = new MatTableDataSource( this.missionsTraitees);
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


  openModalDetaillLivraiAttent(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  openModalModiferLivraiAttent(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  selectedCArteJAwaz(event:any){
   // this.soldeactuel=this.listCartejawz.find(e=>e.id==event.target.value).soldeactuel || 0; 
     }
   
     affectionCarteJawaz(demande_id:number) {
      this.idsvignettes=this.selectedItems.map(e=>e.id).toString();
   console.log(this.idsvignettes)
       this.demandeMisionService.affectionvignette(demande_id,this.idsvignettes, this.solde).subscribe(res=>{
         console.log(res)
         this.modalService.dismissAll();
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
     
  close(){
    this.modalService.dismissAll();
  }

  openDetaillCarburant(data:any){
    this.router.navigateByUrl('/home/gestion-parc-auto/detail-carburant')
  }
  pageCurrentChange(event :any){
    this.currentPage=event;
    if(this.tabID==1){
      this.getallDemandeMisionaffectinCarte();
    }if(this.tabID==2){
      this.getallDemandeMisionaffectionVignete();
    }
  //  this.getallDemandeMisionaffectionVoiture();
  }
    sizeCurrentChange(event :any){
      this.size=event;
      if(this.tabID==1){
        this.getallDemandeMisionaffectinCarte();
      }if(this.tabID==2){
        this.getallDemandeMisionaffectionVignete();
      }
   //   this.getallDemandeMisionaffectionVoiture();
     }
}


