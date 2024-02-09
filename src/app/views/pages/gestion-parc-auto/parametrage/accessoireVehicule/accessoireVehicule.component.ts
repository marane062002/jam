import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuantiteReapprovisionnement } from '../../../../../core/_base/layout/models/quantite-reapprovisionnement';
import { Reference } from '../../../../../core/_base/layout/models/reference';
import { CategorieArticleService } from '../../../../../core/_base/layout/services/gestionStock/categorie-article.service';

import Swal, { SweetAlertIcon } from 'sweetalert2';
import { AccessoireVehicule, IAccessoireVehicule } from '../../common/models/accessoire-vehicule.model';
import { AccessoireVehiculeService } from './services/accessoire-vehicule.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accessoireVehicule',
  templateUrl: './accessoireVehicule.component.html',
  styleUrls: ['./accessoireVehicule.component.scss']
})
export class AccessoireVehiculeComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  isLoading=true;
  datasize: number = 0;
  displayedColumns: string[] = [
		"id",
		"code",
		"name",
    "actions"
	];
 
  FormReference: FormGroup;
  accessoire:AccessoireVehicule;
  accessiores:AccessoireVehicule[];
  reference=new Reference();
  currentPage=0;
  size=5;
  totalPages=1;
  inputSearch:number
  actions: any = { canDetail: true ,canModify:true ,canAdd:true,withAction:true,canDelete:true}
  
  constructor(
    private refernceService:AccessoireVehiculeService,
    private translate:TranslateService,
    private router:Router,
    protected modalService: NgbModal,
    private categorieArticleService:CategorieArticleService) {
      this.FormReference= new FormGroup({
        code: new FormControl('',Validators.required),
        name: new FormControl('',Validators.required),
        id: new FormControl('')
    })
  }

  ngOnInit() {

    this.allQuantiteReapprovision();
   
  }
  addNow(){
    this.router.navigateByUrl("gestionParcAuto/accessoire-vehicule-new")
  }
  dataDettalies:any

  showVehicule(content:any,data:any){
    console.log(data)
    this.dataDettalies = data
    this.modalService.open(content, {
      size: "xl",
    });
  }


  allQuantiteReapprovision(){
   this.refernceService.pageable(this.currentPage, this.size).subscribe(res=>{
      console.log(res)
      let data:any=res;
      this.dataSource = new MatTableDataSource(data.content);
      this.isLoading = false;
      this.datasize = data.totalItems;
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
  allEntityMagasisearch(keyWord:number){
/*     this.refernceService.Keyword(this.currentPage, this.size,keyWord).subscribe(res=>{
    console.log(res)
   // let data:any=ListeReapprovinnement=data.Content;
   // this.totalPages=data.totalPages;
  },err=>{
    console.log(err)
  }) */
}
applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}
searchBykeyWord(event:any){
  this.allEntityMagasisearch(this.inputSearch);
  console.log(this.inputSearch)
}

  

  update(value:IAccessoireVehicule){
    console.log(value)
    if(this.FormReference.valid){
        this.refernceService.update(value).subscribe(res=>{
          console.log(res)
          this.alert('success',"Gestion des accessoires", "accessoire a été bien modifier ");
          this.ngOnInit();

        },err=>{
          this.alert('error',"Gestion des accessoires", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");
        })
    }
    console.log(value)
  }


  // deleteRefernce(data:any){
  //   Swal.fire({
  //     title: ' ',
  //     text: "voulez-vous vraiment supprimer ce  accessoire ?",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Supprimer',
  //     cancelButtonText: 'Fermer'

  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.refernceService.delete(data).subscribe(res=>{
  //         this.ngOnInit();
  //         Swal.fire({
  //           title: 'accessoire  supprimé avec succès !',
  //           icon: 'success',
  //         });
  //       },err=>{
  //         console.log(err)
  //       })
     
  //     }
  //   })

  // }



  deleteAutorisation(id: number): void {
    Swal.fire({
      title: this.translate.instant("PAGES.SUPPRIMER.MESSAGE_SUPPRESSION"),
      icon: "question",
      iconHtml: "?",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log(" supprimer ");
        this.refernceService.delete(id).subscribe(
          (res) => {
            console.log(res)
            // location.reload();
            Swal.fire({
              position: "center",
              icon: "success",
              title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
              showConfirmButton: false,
              timer: 2500,
            });
          },
          (error) => {
            console.log("error ===============================================> ", error);
            Swal.fire({
              position: "center",
              icon: "error",
              title: this.translate.instant("PAGES.GENERAL.MSG_DEL_NOCONFIRMED_MESSAGE"),
              showConfirmButton: false,
              timer: 2500,
            });
          }
        );
        
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: this.translate.instant("PAGES.GENERAL.MSG_DEL_NOCONFIRMED"),
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  }


 
  // event pagination 
pageCurrentChange(event :any){
  this.currentPage=event;

  console.log(this.currentPage, this.size)
  this.allQuantiteReapprovision();
}
  sizeCurrentChange(event :any){
    this.size=event;
    console.log(this.currentPage, this.size)
    this.allQuantiteReapprovision();
   }
  alert(icon:SweetAlertIcon, title:string, message:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
    })
  }

  close() {
    this.modalService.dismissAll();
  }


}
