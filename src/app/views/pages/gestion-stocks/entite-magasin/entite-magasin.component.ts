import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorieArticle } from '../../../../core/_base/layout/models/categorie-article';
import { EntityMagasin } from '../../../../core/_base/layout/models/entity-magasin';
import { CategorieArticleService } from '../../../../core/_base/layout/services/gestionStock/categorie-article.service';
import { EntityMagasinService } from '../../../../core/_base/layout/services/gestionStock/entity-magasin.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-entite-magasin',
  templateUrl: './entite-magasin.component.html',
  styleUrls: ['./entite-magasin.component.scss']
})
export class EntiteMagasinComponent implements OnInit {
  displayedColumns: string[] = [
		"id",
		"libelle",
		"actions"
	];

  isLoading=true;
  dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  datasize: number = 0;

  listEntityMagasin:CategorieArticle[];
  entityMagasin=new EntityMagasin();
  currentPage=0;
  size=5;
  totalPages=1;
  inputSearch:string
  actions: any = { canDetail: true ,canModify:true, canDelete:true ,canAdd:true,withAction:true}
  
  constructor(private modalService: NgbModal, 
    private entityMagasinService:EntityMagasinService,
    private router:Router,private translate:TranslateService,
    private categorieArticleService:CategorieArticleService) {
    
  }

  ngOnInit() {

    this.alllistEntityMagasin();
   
  }


  alllistEntityMagasin(){
    this.entityMagasinService.pageable(this.currentPage, this.size).subscribe(res=>{
      console.log(res)
      let data:any=res;
      this.listEntityMagasin=data.Content;
      this.totalPages=data.totalPages;
      this.datasize = data.Content.length;
      this.dataSource = new MatTableDataSource(this.listEntityMagasin);
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

    },err=>{
      console.log(err)
    })
  }
  allEntityMagasisearch(keyWord:string){
    this.entityMagasinService.Keyword(this.currentPage, this.size,keyWord).subscribe(res=>{
    console.log(res)
    let data:any=res;
    this.listEntityMagasin=data.Content;
    this.totalPages=data.totalPages;
  },err=>{
    console.log(err)
  })
}
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
searchBykeyWord(event:any){
  if(this.inputSearch =="" || this.inputSearch ==null){
    this.ngOnInit();
  }else
  this.allEntityMagasisearch(this.inputSearch);
  console.log(this.inputSearch)
}


 
  
  supprimerEntityMagasin(data:any){
    Swal.fire({
      title: ' ',
      text: "voulez-vous vraiment supprimer ce organisme ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Fermer'

    }).then((result) => {
      if (result.isConfirmed) {
        this.entityMagasinService.delete(data).subscribe(res=>{
          this.ngOnInit();
          Swal.fire({
            title: "organisme  supprimé avec succès !",
            icon: 'success',
          });
        },err=>{
          console.log(err)
        })
     
      }
    })

  }
  modalAjouterEntityMagasin(content:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalDetailFournisseur(content:any,data:any){
  this.entityMagasin=data;
    console.log(data)
    this.modalService.open(content, {
      size: "lg",
    });
  }




  close(){
    this.modalService.dismissAll();
  }
  // event pagination 
pageCurrentChange(event :any){
  this.currentPage=event;

  console.log(this.currentPage, this.size)
  this.alllistEntityMagasin();
}
  sizeCurrentChange(event :any){
    this.size=event;
    console.log(this.currentPage, this.size)
    this.alllistEntityMagasin();
   }
  alert(icon:SweetAlertIcon, title:string, message:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
    })
  }
  addNow(){
    this.router.navigateByUrl('/gestionStock/new-entite');
  }
}
