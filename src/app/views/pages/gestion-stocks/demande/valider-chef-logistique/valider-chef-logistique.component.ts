import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { forkJoin, from, throwError } from 'rxjs';
import { ArticleWithQteLivreeDTO } from '../../../../../core/_base/layout/models/ArticleWithQteLivreeDTO';
import { DemandeFournitureDTO } from '../../../../../core/_base/layout/models/DemandeFournitureDTO';
import { FonctionnaireDTO } from '../../../../../core/_base/layout/models/fonctionnaire-dto';
import { LigneDemandeFournistureDTO } from '../../../../../core/_base/layout/models/LigneDemandeFournistureDTO';
import { ValiderChefServiceDTO } from '../../../../../core/_base/layout/models/ValiderChefServiceDTO';
import { FonctionnaireService, FonctionnaireEntityResponse } from '../../../../../core/_base/layout/services/fonctionnaire.service';
import { DemandeFournitureService, DemandeFournitureStringResponse } from '../../../../../core/_base/layout/services/gestionStock/demande-fourniture.service';
import { LigneDemandeFournitureArrayResponse, LigneDemandeFournitureService } from '../../../../../core/_base/layout/services/gestionStock/ligne-demande-fourniture.service';
import Swal from 'sweetalert2';

import { ArticleToUpdate } from '../valider-chef-service/valider-chef-service.component';

@Component({
  selector: 'app-valider-chef-logistique',
  templateUrl: './valider-chef-logistique.component.html',
  styleUrls: ['./valider-chef-logistique.component.scss']
})
export class ValiderChefLogistiqueComponent implements OnInit {

  fonctionnaire : FonctionnaireDTO = this.localStorege.retrieve("userInfo") as  FonctionnaireDTO ;
page : any = 1 ;
pageSize : any = 5 ;
validerChefLogistiqueFormGroup : FormGroup ;
fonctionnaireDTO : FonctionnaireDTO = {};
  demandeFournitureDTO   : DemandeFournitureDTO = {} ;
  lisgneDemandeFournitureListDto : LigneDemandeFournistureDTO[] = [] ;
  HestoriquelisgneDemandeFournitureListDto : LigneDemandeFournistureDTO[] = [] ;
  idDemandeFournitureDTO : any = 0;
  constructor(
    private route : Router , 
    private fonctionnaireService : FonctionnaireService,
    private activatedRoute : ActivatedRoute,
     private demandeFournitureService : DemandeFournitureService,
     private lignDemandeFournitureService  : LigneDemandeFournitureService, 
     private fb : FormBuilder,
     private localStorege:LocalStorageService
  ) { 
    this.validerChefLogistiqueFormGroup = this.fb.group({
      qteLivree : this.fb.array([]) ,
      observation: [{value : "" , disabled : false} , [Validators.required]],
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
   
     this.demandeFournitureDTO = demandeFourniture.body ;
     this.lisgneDemandeFournitureListDto = ligneDemandeFourniture.body ;
     console.log( this.lisgneDemandeFournitureListDto);
     let idsArticle= this.lisgneDemandeFournitureListDto.map(e=>e.article.id);

     console.log(idsArticle)
     this.loadFonctionnaire(this.demandeFournitureDTO.idFonctionnaire);
     this.loadAllLigneDemandeFournitureByIdDemande(this.demandeFournitureDTO.idFonctionnaire,idsArticle)
     this.patchValue();
  }) 


 } catch (error) {
    throwError(error)
 }

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
              idFonctionnaire:this.fonctionnaireDTO.id,
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

patchValue() : void {
try {
   this.validerChefLogistiqueFormGroup.patchValue({
    qteLivree : this.lisgneDemandeFournitureListDto  
   })
   this.setQteLivree() ;
   console.log(this.validerChefLogistiqueFormGroup.get('qteLivree'))
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
/*  try {
  let articleWithQteLivreeDTOList  :  ArticleWithQteLivreeDTO[] = [];

  let validerParChefService : ValiderChefServiceDTO = {
    idDemandeFourniture : this.idDemandeFournitureDTO , 
  //  articleWithQteLivreeDTOList : articleWithQteLivreeDTOList
  }
  this.demandeFournitureService.rejecterParChefService(validerParChefService).subscribe((res : DemandeFournitureStringResponse) => {
    this.modelValidation();
  })
} catch (error) {
    throwError (error)
} */
}
loadAllLigneDemandeFournitureByIdDemande(idFonctionnaire: any,idsarticle:any) : void {
  try {
   this.lignDemandeFournitureService.AllLigneDemandeFournitureByIdDemande(idFonctionnaire,idsarticle).subscribe((res:LigneDemandeFournitureArrayResponse ) => {

     console.log(res)
     this.HestoriquelisgneDemandeFournitureListDto = res.body;
     
   })
  } catch (error) {
    throwError(error)
  }
 }
loadFonctionnaire(idFonctionnaire: any) : void {
  try {
   this.fonctionnaireService.getFonctionnaireById(idFonctionnaire).subscribe((res: FonctionnaireEntityResponse) => {
     console.log(res)
     this.fonctionnaireDTO = res.body ;
     
   })
  } catch (error) {
    throwError(error)
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
        idFonctionnaire:this.fonctionnaire.id,
        observation:this.validerChefLogistiqueFormGroup.get('observation').value,
        articleWithQteLivreeDTOList : articleWithQteLivreeDTOList
      }
      this.demandeFournitureService.validerParChefLogistique(validerParChefService).subscribe((res : DemandeFournitureStringResponse) => {
        this.modelValidation();
      })
    } catch (error) {
        throwError (error)
    }
  }

  getControls() {
    return (this.validerChefLogistiqueFormGroup.get('qteLivree') as FormArray).controls;
  }


  modelValidation()  :  void{
    Swal.fire({
      title: 'Demande fourniture est validé avec succès !',
      icon: 'success',
    }).then(result => {
      this.route.navigate(["/home/gestion-stocks/valider-demande"]) ;
    });
  }
  modelValidationRejecter()  :  void{
    Swal.fire({
      title: 'Demande fourniture est rejeté  avec succès !',
      icon: 'success',
    }).then(result => {
      this.route.navigate(["/home/gestion-stocks/valider-demande"]) ;
    });
  }
}

