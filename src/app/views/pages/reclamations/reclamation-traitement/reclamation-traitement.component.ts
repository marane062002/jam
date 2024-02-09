import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReclamationsService } from '../../shared/reclamations.service';
import { NgForm, FormControl } from '@angular/forms';
import { PersonnePhysiqueService } from '../../shared/personne-physique.service';
import { PersonneMoraleService } from '../../shared/personne-morale.service';
import * as $ from 'jquery';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'kt-reclamation-traitement',
  //selector: 'ngbd-timepicker-basic',
  templateUrl: './reclamation-traitement.component.html',
  styleUrls: ['./reclamation-traitement.component.scss']
})
export class ReclamationTraitementComponent implements OnInit {

  //time = { hour: 13, minute: 30 };
  
  constructor(private service : ReclamationsService,private service1 : PersonnePhysiqueService
    ,private service2 : PersonneMoraleService,private router: Router,private activatedRoute: ActivatedRoute) { }
  //time = { hour: 10, minute: 45 };
  timeDebutTraitement ={hour:10 , minute:10};
  timeFinTraitement={hour:10 , minute:10};
  timeCloture={hour:10 , minute:10};
	date = new FormControl(new Date());
	serializedDate = new FormControl(new Date().toISOString());
  allcanalReponse;
  statutTraitement;
  selectedFiles=[];
  reclam;
  pjs=[];
  pjstraitement;
  reclamation=   {
    "reclamation":{
      "id":0,
    "descriptionCourte": "",
    "descriptionLongue": "",
    "dateDepot": null,
    "dateDebutTraitement": null,
    "dateFinTraitement": null,
    "cloture": null,
    "observations":"",
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

  ngOnInit() {
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
     this.activatedRoute.queryParams.subscribe(params => {
      this.reclam= params['reclam']; 
     });
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
   /*  document.getElementById("btnAddpm").style.display="inline";
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
     this.service.getByIdreclamationpjs(this.reclam).subscribe(m => {
       console.log(m);
       this.pjs=m;
  })
  this.service.getallStatut().subscribe(data => {
   this.statutTraitement=data;
   });

   this.service.getallCanalReponse().subscribe(data => {
    this.allcanalReponse=data;
    });
    this.service.getByIdreclamationpjstraitement(this.reclam).subscribe(k => {
      this.pjstraitement=k;
    })
  
  
  }
  
  onClickPjTraitementName(e,id) {
    var r=e.substring(0,e.length-4);
    window.open(environment.API_ALFRESCO_URL +'/PjTraitementReclamations/'+r, '_blank');
  }
  
  save(event: any): void {
    this.selectedFiles = event.target.files;
}

showReclamation(idRec){
  this.router.navigate(['/reclamations/reclamations-list'], { queryParams: { reclam: idRec } })
}
onSubmit() { 
  let formDataToSend={
    "reclamation":null,"pps":null,"pms":null };
    formDataToSend['reclamation']=this.reclamation['reclamation'];

  if( this.reclamation.pps.nom!=""){
    formDataToSend['pps']=this.reclamation['pps'];
  }
 else {
    formDataToSend['pms']=this.reclamation['pms'];
   }
   var dt=new Date(this.reclamation.reclamation.dateDebutTraitement);
 formDataToSend.reclamation.dateDebutTraitement=new Date(dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate()+' '+this.timeDebutTraitement.hour+':'+this.timeDebutTraitement.minute);
 var dt1=new Date(this.reclamation.reclamation.dateFinTraitement);
 formDataToSend.reclamation.dateFinTraitement=new Date(dt1.getFullYear() + "/" + (dt1.getMonth() + 1) + "/" + dt1.getDate()+' '+this.timeFinTraitement.hour+':'+this.timeFinTraitement.minute);
 var dt2=new Date(this.reclamation.reclamation.cloture);
 formDataToSend.reclamation.cloture=new Date(dt2.getFullYear() + "/" + (dt2.getMonth() + 1) + "/" + dt2.getDate()+' '+this.timeCloture.hour+':'+this.timeCloture.minute);
this.service.sendreclamation(formDataToSend.reclamation,this.selectedFiles).subscribe(res => {
if(this.selectedFiles.length>0){
  this.service.nouvellepjTraitement(this.selectedFiles,res).subscribe(res => {

  });
}
    this.router.navigate(['/reclamations/reclamation-detail']);
  })

}



}
