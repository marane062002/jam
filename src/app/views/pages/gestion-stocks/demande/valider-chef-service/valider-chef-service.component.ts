import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { forkJoin, throwError } from 'rxjs';
import { ArticleWithQteLivreeDTO } from '../../../../../core/_base/layout/models/ArticleWithQteLivreeDTO';
import { DemandeFournitureDTO } from '../../../../../core/_base/layout/models/DemandeFournitureDTO';
import { FonctionnaireDTO } from '../../../../../core/_base/layout/models/fonctionnaire-dto';
import { LigneDemandeFournistureDTO } from '../../../../../core/_base/layout/models/LigneDemandeFournistureDTO';
import { ValiderChefServiceDTO } from '../../../../../core/_base/layout/models/ValiderChefServiceDTO';
import { DemandeFournitureService, DemandeFournitureStringResponse } from '../../../../../core/_base/layout/services/gestionStock/demande-fourniture.service';
import { LigneDemandeFournitureService } from '../../../../../core/_base/layout/services/gestionStock/ligne-demande-fourniture.service';
import Swal from 'sweetalert2';

export interface ArticleToUpdate  {
  idArticle ?: any | null,
  numerArticle  ?: string | null,
  categorie ?: string | null,
  designation ?: string | null ,
  qteDemande ?: any | null , 
  qteLivree ?: any | null,
  quantiteDisponible ?: any | null

} 

@Component({
  selector: 'app-valider-chef-service',
  templateUrl: './valider-chef-service.component.html',
  styleUrls: ['./valider-chef-service.component.scss']
})
export class ValiderChefServiceComponent implements OnInit {
  fonctionnaire : FonctionnaireDTO = this.localStorege.retrieve("userInfo") as  FonctionnaireDTO ;
  page : any = 1 ;
  pageSize : any = 5 ;
  ligneArticleDemandeFournitureFormGroup : FormGroup ;

    demandeFournitureDTO   : DemandeFournitureDTO = {} ;
    lisgneDemandeFournitureListDto : LigneDemandeFournistureDTO[] = [] ;
    idDemandeFournitureDTO : any = 0;
    constructor(
      private route : Router , 
      private activatedRoute : ActivatedRoute,
       private demandeFournitureService : DemandeFournitureService,
       private lignDemandeFournitureService  : LigneDemandeFournitureService, 
       private localStorege: LocalStorageService,
       private fb : FormBuilder
    ) { 
      this.ligneArticleDemandeFournitureFormGroup = this.fb.group({
        qteLivree : this.fb.array([]) 
      })
      
    }
  
    ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe(params => {
        this.idDemandeFournitureDTO = params["idDemandeFourniture"];
        if(this.idDemandeFournitureDTO ==0) {
          this.route.navigateByUrl("/home");
        }else{
          this.loadDemandeFournitureDetails(this.idDemandeFournitureDTO);
        }
      })
    }
  
    loadDemandeFournitureDetails(idDemandeFournitureDTO : any) : void {
   try {
     forkJoin({demandeFourniture : this.demandeFournitureService.getAllDemandeFournitureByid(idDemandeFournitureDTO) ,
               ligneDemandeFourniture : this.lignDemandeFournitureService.getLigneDemandeFournitureByIdDemande(idDemandeFournitureDTO)
    }).subscribe(({demandeFourniture , ligneDemandeFourniture}) => {
       this.demandeFournitureDTO = demandeFourniture.body  ;
       this.lisgneDemandeFournitureListDto = ligneDemandeFourniture.body ;
       this.patchValue();
    }) 
  
  
   } catch (error) {
      throwError(error)
   }
  
    }

patchValue() : void {
  try {
     this.ligneArticleDemandeFournitureFormGroup.patchValue({
      qteLivree : this.lisgneDemandeFournitureListDto
     })
     this.setQteLivree() ;
     console.log(this.ligneArticleDemandeFournitureFormGroup.get('qteLivree'))
  } catch (error) {
     throwError(error)
  }
} 

setQteLivree() : void {
  try {
     let control = <FormArray>this.ligneArticleDemandeFournitureFormGroup.controls.qteLivree;
     this.lisgneDemandeFournitureListDto.forEach(x => {
     let articleToUpdate : ArticleToUpdate =  {
      idArticle:  x.article.id ,
      numerArticle  : x.article.numeroArticle,
      categorie : x.article.categorieArticle.libelleFr,
      designation :x.article.designation ,
      qteDemande :  x.quantiteDemande  , 
      qteLivree : x.quantiteLivre
     }
     control.push(this.fb.group(articleToUpdate));
  })

  } catch (error) {
    throwError(error)
  }
}



rejeterDemandeFourniture(){

  Swal.fire({
    title: 'Voulez-vous vraiment refuser cette Demande ?',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Oui ',
    cancelButtonText: 'Non ',
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        let articleWithQteLivreeDTOList  :  ArticleWithQteLivreeDTO[] = [];
      
        let validerParChefService : ValiderChefServiceDTO = {
          idDemandeFourniture : this.idDemandeFournitureDTO , 
          idFonctionnaire:this.fonctionnaire.id,
          textReject:result.value
        }
        this.demandeFournitureService.rejecterParChefService(validerParChefService).subscribe((res : DemandeFournitureStringResponse) => {
          this.modelValidationRejecter();
        })
      } catch (error) {
          throwError (error)
      }
    }
  })

}
ModifierDemandeFourniture(){
  {

    Swal.fire({
      title: 'Voulez-vous vraiment demander  à modifier cette Demande ?',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Oui ',
      cancelButtonText: 'Non ',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          let articleWithQteLivreeDTOList  :  ArticleWithQteLivreeDTO[] = [];
        
          let validerParChefService : ValiderChefServiceDTO = {
            idDemandeFourniture : this.idDemandeFournitureDTO , 
            idFonctionnaire:this.fonctionnaire.id,
            textReject:result.value
          }
          this.demandeFournitureService.ModifierDemande(validerParChefService).subscribe((res : DemandeFournitureStringResponse) => {
            Swal.fire({
              title: 'Demande fourniture est changer   avec succès !',
              icon: 'success',
            }).then(result => {
              this.route.navigate(["/home/gestion-stocks/valider-demande"]) ;
            });
          })
        } catch (error) {
            throwError (error)
        }
      }
    })
  
  }
}
    validerDemandeFourniture() : void {
      try {
        let articleWithQteLivreeDTOList  :  ArticleWithQteLivreeDTO[] = [];
        this.getControls().forEach(form => {
          
          articleWithQteLivreeDTOList.push({idArticle : form.value.idArticle , qteLivree :  form.value.qteLivree })
          
        })
        let validerParChefService : ValiderChefServiceDTO = {
          idDemandeFourniture : this.idDemandeFournitureDTO , 
          articleWithQteLivreeDTOList : articleWithQteLivreeDTOList,
          idFonctionnaire:this.fonctionnaire.id,
        }
        this.demandeFournitureService.validerParChefService(validerParChefService).subscribe((res : DemandeFournitureStringResponse) => {
          this.modelValidation();
        })
      } catch (error) {
          throwError (error)
      }
    }

    getControls() {
      return (this.ligneArticleDemandeFournitureFormGroup.get('qteLivree') as FormArray).controls;
    }

    modelValidationRejecter()  :  void{
      Swal.fire({
        title: 'Demande fourniture est rejeté  avec succès !',
        icon: 'success',
      }).then(result => {
        this.route.navigate(["/home/gestion-stocks/valider-demande"]) ;
      });
    }
    modelValidation()  :  void{
      Swal.fire({
        title: 'Demande fourniture est validé avec succès !',
        icon: 'success',
      }).then(result => {
        this.route.navigate(["/home/gestion-stocks/valider-demande"]) ;
      });
    }
}
