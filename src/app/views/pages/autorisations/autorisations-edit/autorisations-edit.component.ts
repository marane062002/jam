import { Component, OnInit } from '@angular/core';
import { AutorisationsService } from '../../shared/autorisations.service';
import { PersonnePhysiqueService } from '../../shared/personne-physique.service';
import { PersonneMoraleService } from '../../shared/personne-morale.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BiensService } from '../../shared/biens.service';
import { NgForm } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import * as $ from 'jquery';
@Component({
  selector: 'kt-autorisations-edit',
  templateUrl: './autorisations-edit.component.html',
  styleUrls: ['./autorisations-edit.component.scss']
})
export class AutorisationsEditComponent implements OnInit {

  constructor(private service : AutorisationsService, 
    private service4 : BiensService,private service1 : PersonnePhysiqueService
    ,private service2 : PersonneMoraleService, private activatedRoute: ActivatedRoute, private router: Router) { }
  id;
  pjs=[];
  selectedFiles={};
  autorisation={"dateDebut":null,"dateFin":null,"statutdemandeautorisation":{"id":0,"libelle":""}
  ,"typeAutorisation":{"id":0,"typeAutorisation":""},"objet":"","id":0,
  "ppsourceautorisation":{"prenom":"","nom":"","cin":"","telephoneGsm":""},
  "pmsourceautorisation":{"rc":"","identifiantFiscal":"","numeroPatente":"","teleGsm":""},
  "objetdemandeautorisation":{"objetDemandeAutorisation":"","typeObjetReservation":{"typeObjetAutorisation":""},"adresse":""},
  "espace":{"espace":""},"note":""};
  
  allStatAut;
  timeDebutAutorisation ={hour:10 , minute:10};
  timeFinAutorisation={hour:10 , minute:10};
  ppSourceAutorisation={
    "nom": "",
    "prenom": "",
    "cin": "",
    "adresse": "",
    "telephoneFixe": "",
    "telephoneGsm":"",
    "eMail": "",
    "fax": ""
};
  pmSourceAutorisation={
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
  typeBien;
  biens;
  typesAutorisation;

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
      this.id= params['reclam']; 
     });
     this.service.getByIdautorisationpjs(this.id).subscribe(m => {
      this.pjs=m;
    })
     this.service4.getTypesBien().subscribe(data => { 
      this.typeBien=data;
     }); 
     this.service4.getAllBien().then(data => { 
      this.biens=data;
     });
     this.service4.getTypeAutorisation().subscribe(data => { 
      this.typesAutorisation=data;
     });
     this.service.getByIdAutorisation(this.id).subscribe(data => { 
       console.log(data)
       if(data.ppsourceautorisation==0){
       this.service2.getByIdpm(data.pmsourceautorisation).subscribe(res=>{
        this.pmSourceAutorisation=res;
       })
         document.getElementById("pmmm").style.display="inline";
        /* document.getElementById("btnAddpm").style.display="inline";
         document.getElementById("btnChangepm").style.display="inline";
         document.getElementById("btnDetailpm").style.display="inline";*/
        }
        if(data.pmsourceautorisation==0){
          document.getElementById("pppp").style.display="inline-table";
         /* document.getElementById("btnAddpp").style.display="inline";
         document.getElementById("btnChangepp").style.display="inline";
         document.getElementById("btnDetailpp").style.display="inline";*/
         this.service1.getByIdpp(data.ppsourceautorisation).subscribe(res=>{
          this.ppSourceAutorisation=res;
         }) 
        }
     this.autorisation = data;
     console.log(this.autorisation)
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
     // this.statutTraitement=data.slice(1).slice(-3);
      this.allStatAut=da.slice(1).slice(-2);
      console.log(this.allStatAut)
     });
  }
 
  
  save(event: any): void {
    this.selectedFiles = event.target.files;
    
  }

  onClickPjName(e,id) {
    var r=e.substring(0,e.length-4);
    window.open(environment.API_ALFRESCO_URL +'/PjAutorisations/'+r, '_blank');
  }
      
  onSubmit() {  
    var dt=new Date(this.autorisation.dateDebut);
    this.autorisation.dateDebut=new Date(dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate()+' '+this.timeDebutAutorisation.hour+':'+this.timeDebutAutorisation.minute);
  var dt1=new Date(this.autorisation.dateFin);
  this.autorisation.dateFin=new Date(dt1.getFullYear() + "/" + (dt1.getMonth() + 1) + "/" + dt1.getDate()+' '+this.timeFinAutorisation.hour+':'+this.timeFinAutorisation.minute); 
    this.service.edit(this.autorisation).subscribe(res => {
        this.service.nouvellepj(this.selectedFiles,res.id).subscribe(res => {
     });
     this.router.navigate(['/autorisations/autorisations-list']);
     })
    }

}
