import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { forkJoin, throwError } from 'rxjs';
import { ArticleWithQteLivreeDTO } from '../../../../../core/_base/layout/models/ArticleWithQteLivreeDTO';
import { DemandeFournitureDTO } from '../../../../../core/_base/layout/models/DemandeFournitureDTO';
import { FonctionnaireDTO } from '../../../../../core/_base/layout/models/fonctionnaire-dto';
import { LigneDemandeFournistureDTO } from '../../../../../core/_base/layout/models/LigneDemandeFournistureDTO';
import { ValiderChefFinanceDTO } from '../../../../../core/_base/layout/models/ValiderChefFinanceDTO';
import { ValiderChefServiceDTO } from '../../../../../core/_base/layout/models/ValiderChefServiceDTO';
import { DemandeFournitureService, DemandeFournitureStringResponse } from '../../../../../core/_base/layout/services/gestionStock/demande-fourniture.service';
import { LigneDemandeFournitureService } from '../../../../../core/_base/layout/services/gestionStock/ligne-demande-fourniture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-valider-directeur',
  templateUrl: './valider-directeur.component.html',
  styleUrls: ['./valider-directeur.component.scss']
})
export class ValiderDirecteurComponent implements OnInit {
  fonctionnaire : FonctionnaireDTO = this.localStorege.retrieve("userInfo") as  FonctionnaireDTO ;
  page : any = 1 ;
  pageSize : any = 5 ;
  
    demandeFournitureDTO   : DemandeFournitureDTO = {} ;
    lisgneDemandeFournitureListDto : LigneDemandeFournistureDTO[] = [] ;
    idDemandeFournitureDTO : any = 0;
    constructor(
      private route : Router, 
      private activatedRoute : ActivatedRoute,
       private demandeFournitureService : DemandeFournitureService,
       private lignDemandeFournitureService  : LigneDemandeFournitureService,
       private localStorege:LocalStorageService
    ) { 
      
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
    loadDemandeFournitureDetails(idDemandeFournitureDTO : any) : void {
   try {
     forkJoin({demandeFourniture : this.demandeFournitureService.getAllDemandeFournitureByid(idDemandeFournitureDTO) ,
               ligneDemandeFourniture : this.lignDemandeFournitureService.getLigneDemandeFournitureByIdDemande(idDemandeFournitureDTO)
    }).subscribe(({demandeFourniture , ligneDemandeFourniture}) => {
       this.demandeFournitureDTO = demandeFourniture.body  ;
       this.lisgneDemandeFournitureListDto = ligneDemandeFourniture.body  ;
    }) 
  
  
   } catch (error) {
      throwError(error)
   }
  
    }


    validerDemandeFourniture() : void {
      try {
        let validerDemandeFourniture : ValiderChefFinanceDTO = {
          idDemandeFourniture : this.idDemandeFournitureDTO ,
          idFonctionnaire:this.fonctionnaire.id,

        }
        this.demandeFournitureService.validerParDirecteur(validerDemandeFourniture).subscribe((res: DemandeFournitureStringResponse) => {
          this.modelValidation();
        })
      } catch (error) {
        throwError(error)
      }
   }
   rejeterDemandeFourniture(){

    Swal.fire({
      title: 'Voulez-vous vraiment refuser cette Demande',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
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
