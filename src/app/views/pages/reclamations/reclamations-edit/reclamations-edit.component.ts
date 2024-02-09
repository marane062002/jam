import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from "@angular/forms";
import { ReclamationsService } from '../../shared/reclamations.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { environment } from '../../../../../environments/environment';
import { PersonnePhysiqueService } from '../../shared/personne-physique.service';
import { PersonneMoraleService } from '../../shared/personne-morale.service';
@Component({
  selector: 'kt-reclamations-edit',
  templateUrl: './reclamations-edit.component.html',
  styleUrls: ['./reclamations-edit.component.scss']
})
export class ReclamationsEditComponent implements OnInit {

  time = { hour: 13, minute: 30 };
  //time2 = { hour: 13, minute: 30 };
  //time3 = { hour: 13, minute: 30 };
  //time4 = { hour: 13, minute: 30 };
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  //serializedDate2 = new FormControl(new Date().toISOString());
  //serializedDate3 = new FormControl(new Date().toISOString());

  reclamation=   {
    "reclamation":{
      "id":"",
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
      "libelle": "",
      "degre": 0
  },
    "canal": {
      "id": 0,
      "libelle": ""
  },
    "canalreponse": {
      "id": 1,
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
idrec;
formData;
severiteAll;
criticiteAll;
typeAll;
sousTypeAll;
statutAll;
canalAll;
canalReponseAll;
allcin;
allidf;
pjs=[];
selectedFiles={};
result;
change;
deletedFiles=[];
  constructor(private service : ReclamationsService,private service1 : PersonnePhysiqueService
    ,private service2 : PersonneMoraleService,private router: Router,private activatedRoute: ActivatedRoute) { }
  
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idrec= params['id'];
     });
     this.service.getByIdreclamation(this.idrec).subscribe(data => { 
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
        /*document.getElementById("btnAddpp").style.display="inline";
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
      this.sousTypeAll=[this.reclamation.reclamation.soustypeReclamation]
      var m=new Date(this.reclamation.reclamation.dateDepot);
      this.time={hour: m.getHours(), minute: m.getMinutes()}
      if(data.reclamation.canalreponse==null){
       this.reclamation.reclamation.canalreponse={
         "id": -1,
         "libelle": ""
     }
      }     
     }); 


   


    this.service.getallseverite().subscribe(data => {
      this.severiteAll=data;
      console.log(data)
     });
     this.service.getallcriticite().subscribe(data => {
      this.criticiteAll=data;
      console.log(data)
     });
     this.service.getallType().subscribe(data => {
      this.typeAll=data;
     });
     this.service.getallStatut().subscribe(data => {
      this.statutAll=data;
      console.log(data)
     });
     this.service.getallCanal().subscribe(data => {
      this.canalAll=data;
      
     });
     this.service.getallCanalReponse().subscribe(data => {
      this.canalReponseAll=data;
      
     });

     this.service.getAllIdf().subscribe(data => {
      this.allidf=data;
      
     }); 

     this.service.getAllCinpp().subscribe(data => {
      this.allcin=data;
      
     });

   
  
    this.service.getByIdreclamationpjs(this.idrec).subscribe(m => {
      this.pjs=m;
    })
$(function () {

  // We can attach the `fileselect` event to all file inputs on the page
  $(document).on('change', ':file', function () {
    var input = $(this),
      numFiles = input.get(0).files ? input.get(0).files.length : 1,
      label =  (new String(input.val())).replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
  });

  // We can watch for our custom `fileselect` event like this
  $(document).ready(function () {
    $(':file').on('fileselect', function (event, numFiles, label) {

      var input = $(this).parents('.input-group').find(':text'),
        log = numFiles > 1 ? numFiles + ' وثائق مختارة' : label;

      if (input.length) {
        input.val(log);
      } else {
        if (log) alert(log);
      }

    });
  });

});
  }

  onClickPjName(e,id) {
    var r=e.substring(0,e.length-4);
    window.open(environment.API_ALFRESCO_URL +'/PjReclamations/'+r, '_blank');
  }
    
  onChangeofOptions(f){
    if(f!= -1){
     this.service.getByCinpp(f).subscribe(data => {
       this.formData['pps']=data;
       
      });}
      else{
       this.formData['pps']={
         "nom": "",
         "prenom": "",
         "cin": "",
         "adresse": "",
         "telephoneFixe": "",
         "telephoneGsm": "",
         "eMail": "",
         "fax": ""
     };
      }
   }
 
   onChangeofOptionsType(f){
     this.service.getBySousType(f.value).subscribe(data => {
       this.sousTypeAll=data;
       console.log(data)
       
      });
   }
 
   onChangeofOptionsidf(f){
     this.service.getByIdf(f).subscribe(data => {
       console.log("on change")
       this.formData.pms=data[0];
       console.log( this.formData.pms)
    });
   }
 
   
   show(typesource){
     console.log('in type')
     if(typesource=='pp'){
       document.getElementById("pmsf").style.display="none" ;
       this.reclamation['pms']={
         "nom": "",
         "rc": "",
         "identifiantFiscal": "",
         "numeroPatente": "",
         "adresse":"",
         "teleFixe": "",
         "teleGsm": "",
         "contact": "",
         "eMail": "",
         "siteWeb": "",
         "fax": "",
         "idvilleRegistreCommerce": 0};
        document.getElementById("ppsf").style.display="inline" ;  }
     else{
       document.getElementById("ppsf").style.display="none" ;
       this.reclamation['pps']={
         "nom": "",
         "prenom": "",
         "cin": "",
         "adresse": "",
         "telephoneFixe": "",
         "telephoneGsm": "",
         "eMail": "",
         "fax": ""
     };
       document.getElementById("pmsf").style.display="inline" ;
     }
   }
  onSubmit() {
 
    console.log(this.selectedFiles)
    if(this.reclamation.reclamation.canalreponse.id==-1){
      this.reclamation.reclamation.canalreponse=null;
    }
    console.log(this.reclamation)
    var dt=new Date(this.reclamation.reclamation.dateDepot);
    this.reclamation.reclamation.dateDepot=new Date(dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate()+' '+this.time.hour+':'+this.time.minute);
   
   this.service.sendreclamation
   (this.reclamation.reclamation,this.selectedFiles).subscribe(res => {
    
    for(var i=0;i<this.deletedFiles.length;i++){
    this.service.deleteByIdpjs(this.deletedFiles[i]).subscribe(m => {
    })}
  
      this.service.nouvellepj(this.selectedFiles,this.reclamation.reclamation.id).subscribe(res => {
      });
  
  
    this.router.navigate(['reclamations/reclamation-detail']);

    })

  }

  onClickDeletePj(e,i){
    if(!this.deletedFiles.includes(e)){
      console.log(i)
       this.pjs.splice(i,1);
      console.log(this.pjs)
      this.deletedFiles.push(e);
      console.log(this.deletedFiles)
    }
    
    console.log(this.deletedFiles)
     /*   this.service.deleteByIdpjs(e).subscribe(m => {
      this.service.getByIdreclamationpjs(this.idrec).subscribe(m => {
        this.pjs=m;
  })
     
})*/

  }

  save(event: any): void {
    this.selectedFiles = event.target.files;
    
  }
      
     /* this.service.sendfile(selectedFiles[i]).subscribe(res => {
     
      })*/
      
    
  


}
