import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReservationsService } from '../../shared/reservations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonnePhysiqueService } from '../../shared/personne-physique.service';
import { PersonneMoraleService } from '../../shared/personne-morale.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'kt-reservations-detail',
  templateUrl: './reservations-detail.component.html',
  styleUrls: ['./reservations-detail.component.scss']
})
export class ReservationsDetailComponent implements OnInit {
  constructor(private service : ReservationsService, 
    private service1 : PersonnePhysiqueService
    ,private service2 : PersonneMoraleService,private activatedRoute: ActivatedRoute, private router: Router) { }
  reclam;
  pjs;
  pjstraitement;
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
  timeDebutAutorisation ={hour:10 , minute:10};
  timeFinAutorisation={hour:10 , minute:10};
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.reclam= params['reclam']; 
     });
     var currentDate = new Date();

     this.service.getByIdAutorisation(this.reclam).subscribe(data => { 
       this.autorisation = data;
       if(this.autorisation.statutReservation.id==2){
        document.getElementById("paiementblock").style.display="inline-table";}
       if(data.paiement==null){
         data.paiement={'montant':0,
         'delais':"",
         'dateGenerationPaiement':""
         }
       }
     if(data.pp==0){
      this.autorisation.pp={
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
      this.autorisation.pm=res;
     })
       document.getElementById("pmmm").style.display="inline";
       /*document.getElementById("btnAddpm").style.display="inline";
       document.getElementById("btnChangepm").style.display="inline";
       document.getElementById("btnDetailpm").style.display="inline";*/
       console.log(this.autorisation)
      }
      if(data.pm==0){
        document.getElementById("pppp").style.display="inline-table";
        this.service1.getByIdpp(data.pp).subscribe(res=>{
          this.autorisation.pp=res;
         })
       /* document.getElementById("btnAddpp").style.display="inline";
       document.getElementById("btnChangepp").style.display="inline";
       document.getElementById("btnDetailpp").style.display="inline";*/
        this.autorisation.pm={
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
         console.log(this.autorisation) 
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
      });
    this.service.getByIdreservationpjsTraitement(this.reclam).subscribe(k => {
  this.pjstraitement=k;
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

  onClickPjName(e,id) {
    var r=e.substring(0,e.length-4);
    window.open(environment.API_ALFRESCO_URL +'/PjReservations/'+r, '_blank');
  }

  onClickPjTraitementName(e,id) {
    var r=e.substring(0,e.length-4);
    window.open(environment.API_ALFRESCO_URL +'/PjReservations/traitement/'+r, '_blank');
  }


  
  onSubmit(form: NgForm) { 
    console.log(this.autorisation)
   this.service.sendaut(this.autorisation).subscribe(res => {
 console.log(res.paiement.numOrdrePaiement)
   // this.router.navigate(['/autorisations/autorisations-list']);
    })
 
      }


}
