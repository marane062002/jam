import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Sortie } from '../../../../core/_base/layout/models/sortie';
import { ILigneDemandeFournistureDTO } from '../../../../core/_base/layout/models/LigneDemandeFournistureDTO';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransferService } from '../../../../core/_base/layout/services/transfer.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ArticleService } from '../../../../core/_base/layout/services/gestionStock/article.service';
import { ArticleStockService } from '../../../../core/_base/layout/services/gestionStock/article-stock.service';
import { LigneDemandeFournitureService } from '../../../../core/_base/layout/services/gestionStock/ligne-demande-fourniture.service';
import { SortieService } from '../../../../core/_base/layout/services/gestionStock/sortie.service';
import { MagasinService } from '../../../../core/_base/layout/services/gestionStock/magasin.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sorties',
  templateUrl: './sorties.component.html',
  styleUrls: ['./sorties.component.scss']
})
export class SortiesComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  isLoading=true;
  datasize: number = 0;
  displayedColumns: string[] = ["numDemande",	"codeAnalytique","status"	,"actions"];

  listSorties:any[];
  sortie=new Sortie();
  listMagasins:any[];
  listArtickeStock:any[];
  listDemandesFourniture:ILigneDemandeFournistureDTO[];
  
  currentPage=0;
  size=5;
  totalPages=1;
  formSortie:FormGroup

  constructor(private modalService: NgbModal,
    private translate:TranslateService,
    private router:Router,
    private articleStockService:ArticleStockService,
    private demandeFournitureService:LigneDemandeFournitureService,
    private sortieService:SortieService ,
    private magasinService:MagasinService) {
/*       this.formSortie= new FormGroup({
        magasin: new FormGroup({
          id: new FormControl('',Validators.required),
        }),
        article: new FormGroup({
          id: new FormControl('',Validators.required),
        }),
        numeroCommande: new FormControl('',Validators.required),
        codeAnalytique: new FormControl('',Validators.required),
        designation: new FormControl('',Validators.required),
        quantite: new FormControl('',Validators.required),
        unite: new FormControl(),
      })*/
     } 

  ngOnInit() {
    this.allSorties();
    
  }
  showSortie(id){
    this.router.navigate(
      ["/gestionStock/details-sortie"],
      { queryParams: { id: id } }
    );
  }

  allSorties(){
    this.sortieService.pageable(this.currentPage, this.size).subscribe(res=>{
      console.log(res)
      let data:any=res;
      this.totalPages=data.totalPages;
      this.totalPages=data.totalPages;
      this.dataSource = new MatTableDataSource(data.Content);
      this.isLoading = false;
      this.datasize = data.Content.length;
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
    },err=>{
      console.log(err)
    })
  }
  SlectedMagasin(event:any){
    console.log(event.target.value);
    let id=event.target.value;
    this.allArticleStockByMagasine(id);
    
  }
  applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

  allMagasins(){
    this.magasinService.all().subscribe(res=>{
      console.log(res)
      let data:any=res;
      this.listMagasins=data;
    },err=>{
      console.log(err)
    })
  }
  createSortie(value:any){

    console.log(value )
    this.sortieService.save(value).subscribe(res=>{
      console.log(res);   
      console.log(res);
      this.alert('success',"Gestion des Sorties ", "Sortie a été bien enregistré ");
      this.formSortie.reset();
      this.close();
      this.ngOnInit();
    },err=>{
      this.alert('error',"Gestion des Sorties ", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
      console.log(err);
    })
    console.log(value)
  }
  allArticleStockByMagasine(id:number){
    this.articleStockService.AllArticleStockByMagasin(id).subscribe(res=>{
      console.log(res)
      let data:any=res;
      this.listArtickeStock=data;
    },err=>{
      console.log(err)
    })
  }
 
  modalAjouterSortie(content:any){
    this.allMagasins();
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalDetailSortie(content:any,data:any){
    console.log(data)
    this.sortie=data;
    this.demandeFournitureService.getLigneDemandeFournitureByIdDemande(data.demandeFourniture.id).subscribe(res=>{
      this.listDemandesFourniture = res.body 
        },err=>{
      console.log(err)
    })
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalModifierSotie(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  supprimerSortie(data:any){

  }

  close(){
    this.modalService.dismissAll();
  }
  pageCurrentChange(event :any){
    this.currentPage=event;
  
    console.log(this.currentPage, this.size)
    this.allSorties();
  }
    sizeCurrentChange(event :any){
      this.size=event;
      console.log(this.currentPage, this.size)
      this.allSorties();
     }
  alert(icon:SweetAlertIcon, title:string, message:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
    })
  }
}
