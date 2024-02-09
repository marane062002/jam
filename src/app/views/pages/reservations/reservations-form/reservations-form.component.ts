import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { ReclamationsService } from '../../shared/reclamations.service';
import { PersonnePhysiqueService } from '../../shared/personne-physique.service';
import { PersonneMoraleService } from '../../shared/personne-morale.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BiensReservationService } from '../../shared/biens-reservation.service';
import { ReservationsService } from '../../shared/reservations.service';
import * as $ from 'jquery';
@Component({
  selector: 'kt-reservations-form',
  templateUrl: './reservations-form.component.html',
  styleUrls: ['./reservations-form.component.scss']
})
export class ReservationsFormComponent implements OnInit {

  @ViewChild('wizard', {static: true}) el: ElementRef;
  constructor(private service:ReclamationsService,  private service2 : BiensReservationService,private service1 : ReservationsService,private service3 : PersonnePhysiqueService, private service4 :PersonneMoraleService, private router: Router,private activatedRoute: ActivatedRoute) { }
  timeDebutTraitement ={hour:10 , minute:10};
  timeFinTraitement={hour:10 , minute:10};
  allcin;
  allrc;
  dataArray=[];
  dataArrayRc=[];
  formData;
  formDataBien;
  typeBien;
  typeAutorisation;
  espcaeBien;
  biens;
  TypeBien;
  EspaceBien;
  typesAutorisation;
  selectedFiles=[];
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  test=[1,2,3]
  

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

    this.resetForm();
    this.service2.getTypesBien().subscribe(data => { 
      this.typeBien=data;
      console.log(data)
     });
     this.service2.getAllBien().subscribe(data => { 
      this.biens=data;
     });
    this.service.getAllCinpp().subscribe(data => { 
      this.allcin=data;
      console.log(this.allcin)
     this.searchDpDropdown();
     });
     this.service.getAllRc().subscribe(data => {
      this.allrc=data;
      this.searchDpDropdownRc();
     }); 
  }
  save(event: any): void {
    this.selectedFiles = event.target.files;
   } 
  ngAfterViewInit(): void {
    // Initialize form wizard
    
		const wizard = new KTWizard(this.el.nativeElement, {
			startStep: 1
    });
    
    	// Validation before going to next page
		wizard.on('beforeNext', (wizardObj) => {
			// https://angular.io/guide/forms
			// https://angular.io/guide/form-validation

			// validate the form and use below function to stop the wizard's step
			// wizardObj.stop();
		});

		// Change event
		wizard.on('change', () => {
			setTimeout(() => {
				KTUtil.scrollTop();
			}, 500);
		});

	

		
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.formData =  {
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
    
  }
  this.formDataBien={
    "objet":"",
    "dateDebut":"",
    "dateFin":"",
    "descriptions":"",
    "ppsourceautorisation":0,
    "pmsourceautorisation":0,
    "objetdemandeautorisation":{
      "id":0,
      "objetDemandeAutorisation":""
    },
    "espaceReservation":{
      "id":0,
      "espace":""
    },
    "typebiendemandeReservation":{
      "id":0,
      "libelle":""
    },
    "statutReservation":{
      "id":1,
      "libelle":"مسجلة"
    }
  }
  }
  show(typesource){
    if(typesource=='pp'){
      this.formData['pms']={
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
        }
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

  onKey(value) {  
    this.dataArray= []; 
    this.selectSearch(value);       
}
selectSearch(value:string){
  let filter = value.toLowerCase();
  for ( let i = 0 ; i < this.allcin.length; i ++ ) {
      let option = this.allcin[i];
      if (  option.toLowerCase().indexOf(filter) >= 0) {
          this.dataArray.push( option );
      }
  }
}


switch(){
  if( this.formData.pps.nom!=""){
    document.getElementById("pppp").style.display="inline";
    document.getElementById("pmmm").style.display="none";
  }
  else{
    document.getElementById("pmmm").style.display="inline";
    document.getElementById("pppp").style.display="none";
  }
} 

onKeyRc(value) {  
  this.dataArrayRc= []; 
  this.selectSearchRc(value);       
}
onChangeofOptionsTypeBien(f){
  console.log(f)
  this.service2.getByTypeBien(f.value.id).subscribe(data => {
    this.TypeBien=data;
   }); 
}

onChangeofOptionsBien(f){
  this.service2.getEspaceByBien(f.value.id).subscribe(data => {
    this.EspaceBien=data;
   }); 
}

selectSearchRc(value:string){
  let filter = value.toLowerCase();
  for ( let i = 0 ; i < this.allrc.length; i ++ ) {
      let option = this.allrc[i];
      if (  option.toLowerCase().indexOf(filter) >= 0) {
          this.dataArrayRc.push( option );
      }
  }
}


  onChangeofOptions1(f){
    this.service.getByCinpp(f.value).subscribe(data => {
     this.formData['pps']=data;
      console.log(this.formData['pps']);
     });
     
     }

     onChangeofOptionsrc(f){
      this.service.getByRc(f.value).subscribe(data => {
        this.formData['pms']=data;
        });
   }
  searchDpDropdownRc(){
    for ( let i = 0 ; i < this.allrc.length; i ++ ) {
        this.dataArrayRc.push( this.allrc[i] );
    }
  }
  searchDpDropdown(){
    for ( let i = 0 ; i < this.allcin.length; i ++ ) {
        this.dataArray.push( this.allcin[i] );
    }
    }

    onSubmit() { 
      var personnePM;
       var dt=new Date(this.formDataBien.dateDebut);
       this.formDataBien.espaceReservation={"id":this.formDataBien.espaceReservation[0]*1}
       this.formDataBien.dateDebut=new Date(dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate()+' '+this.timeDebutTraitement.hour+':'+this.timeDebutTraitement.minute);
     var dt1=new Date(this.formDataBien.dateFin);
     this.formDataBien.dateFin=new Date(dt1.getFullYear() + "/" + (dt1.getMonth() + 1) + "/" + dt1.getDate()+' '+this.timeFinTraitement.hour+':'+this.timeFinTraitement.minute); 
     if( this.formData.pps.nom!=""){
      personnePM=this.formData['pps']
      this.service3.sendpp(personnePM).subscribe(res => {
        this.formDataBien.pp=res;
        this.service1.sendaut(this.formDataBien).subscribe(res1 => {
          if(this.selectedFiles.length>0){ 
            this.service1.nouvellepj(this.selectedFiles,res1.id).subscribe(res => {
        });}
        })
     })
     this.router.navigate(['/reservations/reservations-list']);
     }
    else {
     personnePM=this.formData['pms']
     this.service4.sendpm(personnePM).subscribe(res => {
       this.formDataBien.pm=res;
       this.service1.sendaut(this.formDataBien).subscribe(res1 => {
        if(this.selectedFiles.length>0){ 
          this.service1.nouvellepj(this.selectedFiles,res1.id).subscribe(res => {
      });}
        this.router.navigate(['/reservations/reservations-list']);
      })
     })
   
      }
     
    }

}
