import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Fournisseur } from '../../../../core/_base/layout/models/fournisseur';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { FournisseursService } from '../../../../core/_base/layout/services/gestionStock/fournisseurs.service';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-list-fournissuers',
  templateUrl: './list-fournissuers.component.html',
  styleUrls: ['./list-fournissuers.component.scss']
})
export class ListFournissuersComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  isLoading=true;
  datasize: number = 0;
  displayedColumns: string[] = [
		"nom",
		"adresse",
		"ville",
		"telephone",
		"infoBancaire",
		"siteWeb",
    "tauxRemise",
		"actions",
	];
  listFornisseurs:any[];
  FormFournisseur: FormGroup;
   fournisseur=new Fournisseur();
   listArticle:any[];
   inputSearch:number;
   currentPage=0;
   size=5;
   totalPages=1;
   actions: any = { canDetail: true ,canModify:true, canDelete:true ,canAdd:true,withAction:true}

  constructor(private modalService: NgbModal,
    private router :Router,private translate:TranslateService,
    private fournisseursService:FournisseursService) {
      this.FormFournisseur= new FormGroup({
        id: new FormControl(''),
        nom: new FormControl('',Validators.required),
       email: new FormControl(''),
       adresse: new FormControl('',Validators.required),
       telephone: new FormControl(''),
       siteWeb: new FormControl(''),
       ville: new FormControl('',Validators.required),
       province: new FormControl(''),
       codePostal: new FormControl(''),
       infoBancaire: new FormControl(''),
       tauxRemise: new FormControl(''),
      })

     }

  ngOnInit() {
    this.allFournisseurs();
  }
  applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

  modalModifierTransfert(content:any,data:any){
    this.fournisseursService.getById(data.id).subscribe(res=>{
      console.log(res)
      this.fournisseur=res;
    },err=>{
      console.log(err)
    })
    this.modalService.open(content, {
      size: "lg",
    });
  }


  supprimerFournisseur(data:any){
    Swal.fire({
      title: ' ',
      text: "voulez-vous vraiment supprimer ce fournisseur ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Fermer'

    }).then((result) => {
      if (result.isConfirmed) {
        this.fournisseursService.delete(data).subscribe(res=>{
          this.ngOnInit();
          Swal.fire({
            title: 'fournisseur  supprimé avec succès !',
            icon: 'success',
          });
          window.location.reload()
        },err=>{
          console.log(err)
        })
     
      }
    })

  }
   
updateFournisseur(value:Fournisseur){
  if(this.FormFournisseur.valid){
    this.fournisseursService.update(value.id,value).subscribe(res=>{
      console.log(res)
      this.alert('success',"Gestion des fournisseurs", "fournisseur  a été bien modifier ");
      this.modalService.dismissAll();
      this.FormFournisseur.reset();
      this.ngOnInit();
    },err=>{
   
      this.alert('error',"Gestion des fournisseurs", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
    
 })
  }
}
  allFournisseurs(){
    this.fournisseursService.pageable(this.currentPage, this.size).subscribe(res=>{
      console.log(res)
      let data:any=res;
      this.listFornisseurs=data.content;
      this.totalPages=data.totalPages;
      this.datasize = data.content.length;
      this.dataSource = new MatTableDataSource(this.listFornisseurs);
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
  searchBykeyWord(event:any){
    if(this.inputSearch==null || this.inputSearch ==0){
      this.ngOnInit();
    }else
    this.allFournisseurKeyWord(this.inputSearch);
    console.log(this.inputSearch)
  }
  allFournisseurKeyWord(keyWord:number){
    this.fournisseursService.Keyword(this.currentPage, this.size,keyWord).subscribe(res=>{
      console.log(res)
      let data:any=res;
      this.listFornisseurs=data.content;
      this.totalPages=data.totalPages;
    },err=>{
      console.log(err)
    })
  }
  modalAjouterFournisseur(content:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalDetailFournisseur(content:any,data:any){
    console.log(data)
    this.fournisseur=data;
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalModifierFournisseur(content:any,data:any){
    this.FormFournisseur.patchValue(data);
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
  this.allFournisseurs();
}
  sizeCurrentChange(event :any){
    this.size=event;
    console.log(this.currentPage, this.size)
    this.allFournisseurs();
   }
  alert(icon:SweetAlertIcon, title:string, message:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
    })
  }
  addNow(){
    this.router.navigateByUrl("stock/ajouter-fornisseur")
  }

}
