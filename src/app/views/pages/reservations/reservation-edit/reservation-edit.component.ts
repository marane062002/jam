import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReservationsService } from '../../shared/reservations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonnePhysiqueService } from '../../shared/personne-physique.service';
import { PersonneMoraleService } from '../../shared/personne-morale.service';
import { environment } from '../../../../../environments/environment';
import * as $ from 'jquery';

@Component({
  selector: 'kt-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.scss']
})
export class ReservationEditComponent implements OnInit {
  constructor(private service : ReservationsService, private service1 : PersonnePhysiqueService
    ,private service2 : PersonneMoraleService,private activatedRoute: ActivatedRoute, private router: Router) { }
  reclam;
  pjs=[];
  selectedFiles={};
  autorisation={"id":0,"dateDebut":null,"dateFin":null,"paiement":{'montant':0,
  "delais":"", 'dateGenerationPaiement':"","datePaiement":null,"numRecu":""},"objet":"","description":"","statutReservation":{"id":0,"libelle":""},
   "pp":{"nom": "",
   "prenom": "",
   "cin": "",
   "adresse": "",
   "telephoneFixe": "",
   "telephoneGsm":"",
   "eMail": "",
   "fax": ""},"pm":{ "nom": "",
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
   "idvilleRegistreCommerce": 0},
   "espaceReservation":{"prix":0,"espace":"","bienReservation":{"objetDemandeAutorisation":"","typebiendemandeReservation":{"id":0,
     "libelle":""}}}};
  allStatAut;
  ppSourceAutorisation={"nom": "",
  "prenom": "",
  "cin": "",
  "adresse": "",
  "telephoneFixe": "",
  "telephoneGsm":"",
  "eMail": "",
  "fax": ""}
  pmSourceAutorisation={ "nom": "",
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
  timeDebutAutorisation ={hour:10 , minute:10};
  timeFinAutorisation={hour:10 , minute:10};
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
     var currentDate = new Date();
     this.service.getByIdAutorisation(this.reclam).subscribe(data => { 
       this.autorisation = data;
       console.log(this.autorisation)
       if(data.statutReservation.id==2){
        document.getElementById("paiementblock").style.display="inline-table";}
       if(data.paiement==null){
        this.autorisation.paiement={'montant':0,
        "delais":"", 'dateGenerationPaiement':"","datePaiement":null,"numRecu":""}
       }
     if(data.pp==0){
        this.ppSourceAutorisation={
         "nom": "",
         "prenom": "",
         "cin": "",
         "adresse": "",
         "telephoneFixe": "",
         "telephoneGsm":"",
         "eMail": "",
         "fax": ""
     };
     this.service2.getByIdpm(data.pm).subscribe(res=>{
      this.pmSourceAutorisation=res;
     })

       document.getElementById("pmmm").style.display="inline";
       /*document.getElementById("btnAddpm").style.display="inline";
       document.getElementById("btnChangepm").style.display="inline";
       document.getElementById("btnDetailpm").style.display="inline";*/
      }
      if(data.pm==0){
        document.getElementById("pppp").style.display="inline-table";
       /* document.getElementById("btnAddpp").style.display="inline";
       document.getElementById("btnChangepp").style.display="inline";
       document.getElementById("btnDetailpp").style.display="inline";*/
       this.service1.getByIdpp(data.pp).subscribe(res=>{
        this.ppSourceAutorisation=res;
       })
       this.pmSourceAutorisation={
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
      if(this.autorisation.dateDebut!=null){
        var m=new Date(this.autorisation.dateDebut);
        this.timeDebutAutorisation={hour: m.getHours(), minute: m.getMinutes()}
      }
      if(this.autorisation.dateFin!=null){
        var m=new Date(this.autorisation.dateFin);
        this.timeFinAutorisation={hour: m.getHours(), minute: m.getMinutes()}
      }
     });
     this.service.getAllStatutAut().subscribe(da => {
      this.allStatAut=da.slice(1).slice(-2);
      console.log(this.allStatAut)
     });
     this.service.getByIdreservationpjs(this.reclam).subscribe(m => {
      this.pjs=m;
    })
  }
  onChangeofOptionsStatut(f){
//f.value
console.log(f.value)
if(f.value==2){
  document.getElementById("paiementblock").style.display="inline-table";}
  else{
    document.getElementById("paiementblock").style.display="none";
  this.autorisation.paiement={'montant':0,
  "delais":"", 'dateGenerationPaiement':"","datePaiement":null,"numRecu":""}}
  }

  save(event: any): void {
    this.selectedFiles = event.target.files;
    
  }

  onClickPjName(e,id) {
    var r=e.substring(0,e.length-4);
    window.open(environment.API_ALFRESCO_URL +'/PjReservations/'+r, '_blank');
  }


  
  onSubmit() {
    var dt=new Date(this.autorisation.dateDebut);
    this.autorisation.dateDebut=new Date(dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate()+' '+this.timeDebutAutorisation.hour+':'+this.timeDebutAutorisation.minute);
  var dt1=new Date(this.autorisation.dateFin);
  this.autorisation.dateFin=new Date(dt1.getFullYear() + "/" + (dt1.getMonth() + 1) + "/" + dt1.getDate()+' '+this.timeFinAutorisation.hour+':'+this.timeFinAutorisation.minute); 
   this.service.edit(this.autorisation).subscribe(res => {
    this.service.nouvellepj(this.selectedFiles,res.id).subscribe(res => {
    });
   this.router.navigate(['/reservations/reservations-list']);
    })
 
      }


}