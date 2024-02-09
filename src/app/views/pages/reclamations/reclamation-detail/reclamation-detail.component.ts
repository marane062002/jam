import { Component, OnInit, ɵConsole, HostListener } from '@angular/core';
import { ReclamationsService } from '../../shared/reclamations.service';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PersonnePhysiqueService } from '../../shared/personne-physique.service';
import { PersonneMoraleService } from '../../shared/personne-morale.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-reclamation-detail',
  templateUrl: './reclamation-detail.component.html',
  styleUrls: ['./reclamation-detail.component.css']
})
export class ReclamationDetailComponent implements OnInit {

  constructor(private service : ReclamationsService
    ,private service1 : PersonnePhysiqueService
    ,private service2 : PersonneMoraleService,
    private router: Router,private activatedRoute: ActivatedRoute) {

   }
   one;
   two;
   three;
  reclam;
  reclamation=   {
    "reclamation":{
      "id":0,
      "observations":"",
    "descriptionCourte": "",
    "descriptionLongue": "",
    "dateDepot": null,
    "dateDebutTraitement": null,
    "dateFinTraitement": null,
    "cloture": null,
    "typeReclamation": {
        "id": 0,
        "libelle": "",
        "st": {
            "id": 0,
            "libelle": ""
        }
    },
    "soustypeReclamation":{"id":0,"libelle":""},
    "severite": {
        "id": 0,
        "libelle": "",
        "degre": 0
    },
    "criticite": {
      "id": 0,
      "libelle": "",
      "degre": 0
  },
    "statutReclamation": {
      "id": 1,
      "libelle": "en cours",
      "degre": 0
  },
    "canal": {
      "id": 0,
      "libelle": ""
  },
    "canalreponse": {
      "id": 0,
      "libelle": ""
  },
    "pjReclamtion": 0,
    "description":"",
    "serviceQualificatif": 0,
    "quartier": 0,
    "service": 0,
    "commune": 0},
    "pps": {
      "nom": "",
      "prenom": "",
      "cin": "",
      "adresse": "",
      "telephoneFixe": "",
      "telephoneGsm":"",
      "eMail": "",
      "fax": ""
  },

    "pms": {
    "nom": "",
    "rc": "",
    "identifiantFiscal": "",
    "numeroPatente": "",
    "adresse":"",
    "teleFixe": "",
    "teleGsm":"",
    "contact": "",
    "eMail": "",
    "siteWeb": "",
    "fax": "",
    "idvilleRegistreCommerce": 0}
  
}; 
  pjs;
  pjstraitement;
  ngOnChanges(){}
  ngOnInit() {

   
    this.activatedRoute.queryParams.subscribe(params => {
      this.reclam= params['reclam'];
      this.service.getByIdreclamation(this.reclam).subscribe(data => { 
        console.log(data)
        if(data.reclamation.ppsourceReclamation==0){
          data.pps={
           "nom": "",
           "prenom": "",
           "cin": "",
           "adresse": "",
           "telephoneFixe": "",
           "telephoneGsm":"",
           "eMail": "",
           "fax": ""
       };
       document.getElementById("pmmm").style.display="inline";
      /* document.getElementById("btnAddpm").style.display="inline";
       document.getElementById("btnChangepm").style.display="inline";
       document.getElementById("btnDetailpm").style.display="inline";*/
       this.service2.getByIdpm(data.reclamation.pmsourceReclamation).subscribe(res=>{
        data.pms=res;
        
       })
      
      }
       
        if(data.reclamation.pmsourceReclamation==0){
          this.service1.getByIdpp(data.reclamation.ppsourceReclamation).subscribe(res=>{
            data.pps=res;
           })
         document.getElementById("pppp").style.display="inline";
          /* document.getElementById("btnAddpp").style.display="inline";
         document.getElementById("btnChangepp").style.display="inline";
         document.getElementById("btnDetailpp").style.display="inline";*/
          data.pms={
           "nom": "",
           "rc": "",
           "identifiantFiscal": "",
           "numeroPatente": "",
           "adresse":"",
           "teleFixe": "", 
           "teleGsm":"",
           "contact": "",
           "eMail": "",
           "siteWeb": "",
           "fax": "",
           "idvilleRegistreCommerce": 0};  
        }
        this.reclamation = data;
        console.log(this.reclamation)
        if(data.reclamation.canalreponse==null){
         this.reclamation.reclamation.canalreponse={
           "id": 0,
           "libelle": ""
       }
        }     
       }); 
     });
    this.one= this.service.getByIdreclamationpjs(this.reclam).subscribe(m => {
       console.log('in pj')
      this.pjs=m;   
      });
      this.two=this.service.getByIdreclamationpjstraitement(this.reclam).subscribe(k => {
  this.pjstraitement=k;
})

    
    
  /*  this.service.getByIdreclamation(this.reclam).subscribe(data => { 

      if(data.pps==null){
        data.pps={
         "nom": "",
         "prenom": "",
         "cin": "",
         "adresse": "",
         "telephoneFixe": "",
         "telephoneGsm":"",
         "eMail": "",
         "fax": ""
     };

       document.getElementById("pmmm").style.display="inline";
       document.getElementById("btnAddpm").style.display="inline";
       document.getElementById("btnChangepm").style.display="inline";
       document.getElementById("btnDetailpm").style.display="inline";
      }
      if(data.pms==null){
        document.getElementById("pppp").style.display="inline";
        document.getElementById("btnAddpp").style.display="inline";
       document.getElementById("btnChangepp").style.display="inline";
       document.getElementById("btnDetailpp").style.display="inline";
        data.pms={
         "nom": "",
         "rc": "",
         "identifiantFiscal": "",
         "numeroPatente": "",
         "adresse":"",
         "teleFixe": "", 
         "teleGsm":"",
         "contact": "",
         "eMail": "",
         "siteWeb": "",
         "fax": "",
         "idvilleRegistreCommerce": 0};  
      }
      this.reclamation = data;
      console.log(data)
      if(data.reclamation.canalreponse==null){
       this.reclamation.reclamation.canalreponse={
         "id": 0,
         "libelle": ""
     }
      }     
     });*/
  

 
  }

  ngOnDestroy() {
    console.log('in destroy')
    this.two.unsubscribe();
    this.one.unsubscribe();
  }

 
  onClickPjName(e,id) {
    var r=e.substring(0,e.length-4);
    window.open(environment.API_ALFRESCO_URL +'/PjReclamations/'+r, '_blank');
  }

  onClickPjTraitementName(e,id) {
    var r=e.substring(0,e.length-4);
    window.open(environment.API_ALFRESCO_URL +'/PjTraitementReclamations/'+r, '_blank');
  }

  editpp(idrec){
    this.router.navigate(['/PersonnePhysiqueEdit'], { queryParams: { id: idrec } })
  }

  showpp(rec){
    this.router.navigate(['/PersonnePhysiqueDetail'], { queryParams: { id: rec } })
  }

  editpm(idrec){
    this.router.navigate(['/PersonneMoraleEdit'], { queryParams: { id: idrec } })
  }

  showpm(rec){
    this.router.navigate(['/PersonneMoraleDetail'], { queryParams: { id: rec } })
  }



}
