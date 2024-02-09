import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, throwError } from 'rxjs';
import { DemandeFournitureDTO } from '../../../../../core/_base/layout/models/DemandeFournitureDTO';
import { FonctionnaireDTO } from '../../../../../core/_base/layout/models/fonctionnaire-dto';
import { LigneDemandeFournistureDTO } from '../../../../../core/_base/layout/models/LigneDemandeFournistureDTO';
import { DemandeFournitureService, DemandeFournitureStringResponse } from '../../../../../core/_base/layout/services/gestionStock/demande-fourniture.service';
import { LigneDemandeFournitureService } from '../../../../../core/_base/layout/services/gestionStock/ligne-demande-fourniture.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ArticleToUpdate } from '../valider-chef-service/valider-chef-service.component';
import { ValiderChefServiceDTO } from '../../../../../core/_base/layout/models/ValiderChefServiceDTO';
import { ArticleWithQteLivreeDTO } from '../../../../../core/_base/layout/models/ArticleWithQteLivreeDTO';
import { AppState } from '../../../../../core/reducers';
import { select, Store } from '@ngrx/store';
import { currentUser, User } from '../../../../../core/auth';

@Component({
  selector: 'app-detail-demande',
  templateUrl: './detail-demande.component.html',
  styleUrls: ['./detail-demande.component.scss']
})
export class DetailDemandeComponent implements OnInit {
  fonctionnaire : FonctionnaireDTO //;= this.localStorege.retrieve("userInfo") as  FonctionnaireDTO ;
page : any = 1 ;
pageSize : any = 5 ;
Catégorie
displayedColumns: string[] = [ "numeroArticle", "Categorie","QuantiteDM","Designation","QuantiteLivre"]
isLoading=true;
/* dataSource: MatTableDataSource<any>;
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort; */
datasize: number = 0;
  demandeFournitureDTO   : DemandeFournitureDTO = {} ;
  lisgneDemandeFournitureListDto : LigneDemandeFournistureDTO[] = [] ;
  idDemandeFournitureDTO : any = 0;
  user : Observable<User>;
  idFonctionniare=0;
  validerChefLogistiqueFormGroup : FormGroup ;
  constructor(
    private route : Router , 
    private activatedRoute : ActivatedRoute,
    private translate : TranslateService,
    private fb:FormBuilder,
    private store: Store<AppState>,
     private demandeFournitureService : DemandeFournitureService,
     private lignDemandeFournitureService  : LigneDemandeFournitureService
  ) { 
    this.user=  this.store.pipe(select(currentUser));
    this.validerChefLogistiqueFormGroup = this.fb.group({
      qteLivree : this.fb.array([]) ,
    })
  }

  ngOnInit(): void {


    this.activatedRoute.queryParams.subscribe(params => {
      this.idDemandeFournitureDTO = params["id"];
      if(this.idDemandeFournitureDTO ==0) {
        this.route.navigateByUrl("/");
      }else{
        this.loadDemandeFournitureDetails(this.idDemandeFournitureDTO);
      }
    })
    this.user.subscribe(res=>{
      this.idFonctionniare=res.id;
    })
  }
  ValideDemande(){

  }
  telechargeDoucument(id:any){
    this.demandeFournitureService.getBonById(this.idDemandeFournitureDTO);
  }
  modifierDemande(demande  : any) {
    demande.code=8;
    this.demandeFournitureService.transferDemandeFourniture(demande.id,demande).subscribe(res=>{
      this.route.navigate(["/home/modifier-demande"] , {
        queryParams : {
          idDemandeFourniture   :  demande.id
        }
      })
     })
  
  }
  loadDemandeFournitureDetails(idDemandeFournitureDTO : any) : void {
 try {
   forkJoin({demandeFourniture : this.demandeFournitureService.getAllDemandeFournitureByid(idDemandeFournitureDTO) ,
             ligneDemandeFourniture : this.lignDemandeFournitureService.getLigneDemandeFournitureByIdDemande(idDemandeFournitureDTO)
  }).subscribe(({demandeFourniture , ligneDemandeFourniture}) => {
    console.log(demandeFourniture)
     this.demandeFournitureDTO = demandeFourniture.body ;
     this.lisgneDemandeFournitureListDto = ligneDemandeFourniture.body  ;
     this.patchValue();
     this.datasize = this.lisgneDemandeFournitureListDto.length
    /*  this.dataSource = new MatTableDataSource(this.lisgneDemandeFournitureListDto);
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
     this.dataSource.sort = this.sort; */
  }) 


 } catch (error) {
    throwError(error)
 }

  }
  patchValue() : void {
    try {
       this.validerChefLogistiqueFormGroup.patchValue({
        qteLivree : this.lisgneDemandeFournitureListDto  
       })
       this.setQteLivree() ;
    } catch (error) {
       throwError(error)
    }
    } 
    
    setQteLivree() : void {
    try {
       let control = <FormArray>this.validerChefLogistiqueFormGroup.controls.qteLivree;
       this.lisgneDemandeFournitureListDto.forEach(x => {
       let articleToUpdate : ArticleToUpdate =  {
        idArticle:  x.article.id ,
        numerArticle  : x.article.numeroArticle,
        categorie : x.article.categorieArticle.libelleFr ,
        designation :x.article.designation  ,
        qteDemande :  x.quantiteDemande  , 
        quantiteDisponible :  x.quantiteDisponible  , 
        qteLivree : x.quantiteLivre
       }
       control.push(this.fb.group(articleToUpdate));
    })
    
    } catch (error) {
      throwError(error)
    }
    }

    getControls() {
      return (this.validerChefLogistiqueFormGroup.get('qteLivree') as FormArray).controls;
    }
    validerDemandeFourniture() : void {
      try {
        let articleWithQteLivreeDTOList  :  ArticleWithQteLivreeDTO[] = [];
        this.getControls().forEach(form => {
          
          articleWithQteLivreeDTOList.push({idArticle : form.value.idArticle , qteLivree :  form.value.qteLivree })
          
        })
        let validerParChefService : ValiderChefServiceDTO = {
          idDemandeFourniture : this.idDemandeFournitureDTO , 
          idFonctionnaire:this.idFonctionniare,
          observation:"test test",
          articleWithQteLivreeDTOList : articleWithQteLivreeDTOList
        }
        console.log(validerParChefService);
        this.demandeFournitureService.validerParChefLogistique(validerParChefService).subscribe((res : DemandeFournitureStringResponse) => {
          Swal.fire({
            title: 'Demande fourniture est validé avec succès !',
            icon: 'success',
          }).then(result => {
            this.route.navigateByUrl("/gestionStock/valider-demande") ;
          });
        })
      } catch (error) {
          throwError (error)
      }
    }

}
