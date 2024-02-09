import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReclamationsService } from '../../shared/reclamations.service';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import * as $ from 'jquery';
import { PersonneMoraleService } from '../../shared/personne-morale.service';
import { PersonnePhysiqueService } from '../../shared/personne-physique.service';
import { flatMap } from 'rxjs/operators';



@Component({
  selector: 'app-reclamations-form',
  templateUrl: './reclamations-form.component.html',
  styleUrls: ['./reclamations-form.component.scss']
})
export class ReclamationsFormComponent implements OnInit {
  //nom = new FormControl();



  @ViewChild('wizard', {static: true}) el: ElementRef;
  model: any = {
		nom: '',
		prenom: '',
		cin: '',
		tel: '',
		adresse: '',
		email: '',
		etat: '',
		criticite: '',
		statut: '',
		type: '',
		type2: '',
		description: '',
		longdescription: '',
		canalreclamation: '',
		datedepotreclamation: '',
		datedebuttraitement: '',
		datefin: '',
		datecloture: '',
	};
  constructor(private service : ReclamationsService,private service1 : PersonnePhysiqueService
    ,private service2 : PersonneMoraleService,private router: Router,private activatedRoute: ActivatedRoute) { }
    notseverite=false;
  timeDepot={ hour: 10, minute: 45 };
  formData;
formDataToSend;
severiteAll;
criticiteAll;
typeAll;
sousTypeAll;
statutAll;
canalAll;
canalReponseAll;
allcin;
allidf;
allrc;
result;
allmail;
x;
dataArray=[];
dataArrayRc=[];
selectedFiles=[];
public data: any[] = [];
  public options: any;


  valueChange(e){
      console.log(e);
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

    this.service.getAllCinpp().subscribe(data => { 
      this.allcin=data;
      console.log(this.allcin)
     this.searchDpDropdown();
     // this.allcin.unshift({ id: -1, text: ' اختر البطاقة الوطنية' });
     });
    this.service.getallCanal().subscribe(data => {
      this.canalAll=data;    
     });
 
    this.resetForm();
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
      console.log(data)
     });
     this.service.getallStatut().subscribe(data => {
      this.statutAll=data;
      console.log(data)
     });
     this.service.getAllCinpp().subscribe(data => { 
      this.allcin=data;
    
     });
     this.service.getAllMailpp().subscribe(data => {
      this.allmail=data;
      this.allmail.unshift({ id: -1, text: 'اختر البريد الإلكتروني' });
      
     });
     this.service.getallCanalReponse().subscribe(data => {
      this.canalReponseAll=data;
     });
     this.service.getAllIdf().subscribe(data => {
      this.allidf=data;
      this.allidf.unshift({ id: -1, text: 'اختر معرف الضريبة' });
     });
     this.service.getAllRc().subscribe(data => {
      this.allrc=data;
      this.searchDpDropdownRc();
     });
  }

  pp(f){
    this.service.getByCinpp(f['id']).subscribe(data => {
      this.formData['pps']=data;
       console.log(this.formData['pps']);
      });
  }
  onChangeofOptions(f){
    console.log(f['id'])
   if(f['id']!= -1){
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
  (<HTMLInputElement>document.getElementById('kt_inputmask_2')).readOnly 
  = true; 
    this.service.getByCinpp(f['id']).subscribe(data => {
     this.formData['pps']=data;
      console.log(this.formData['pps']);
     });}
     else{
      (<HTMLInputElement>document.getElementById('kt_inputmask_2')).readOnly 
      = false; 
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

  onChangeofOptions1(f){
    console.log(f)

    this.service.getByCinpp(f.value).subscribe(data => {
     this.formData['pps']=data;
      console.log(this.formData['pps']);
     });
     
     }
        
  

  onChangeofOptionsSousType(f){
    for (var i = 0; i <this.sousTypeAll.length ; i++) {
      if(this.sousTypeAll[i].id==f.value){
        this.formData.reclamation.soustypeReclamation.libelle=this.sousTypeAll[i].libelle;
      }
  }
  }

  onChangeofOptionsSeverite(f){
    for (var i = 0; i <this.severiteAll.length ; i++) {
      if(this.severiteAll[i].id==f.value){
        this.formData.reclamation.severite.libelle=this.severiteAll[i].libelle;
      }
  }
  }

  onChangeofOptionsCriticite(f){
    for (var i = 0; i <this.criticiteAll.length ; i++) {
      if(this.criticiteAll[i].id==f.value){
        this.formData.reclamation.criticite.libelle=this.criticiteAll[i].libelle;
      }
  }
  
  }
  searchDpDropdown(){
    for ( let i = 0 ; i < this.allcin.length; i ++ ) {
        this.dataArray.push( this.allcin[i] );
    }
}
searchDpDropdownRc(){
  for ( let i = 0 ; i < this.allrc.length; i ++ ) {
      this.dataArrayRc.push( this.allrc[i] );
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
onKeyRc(value) {  
  this.dataArrayRc= []; 
  this.selectSearchRc(value);       
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



  

  onChangeofOptionsType(f){
    for (var i = 0; i <this.typeAll.length ; i++) {
      if(this.typeAll[i].id==f.value){
        this.formData.reclamation.typeReclamation.libelle=this.typeAll[i].libelle;
      }
  }
    this.service.getBySousType(f.value).subscribe(data => {
      this.sousTypeAll=data;
    console.log('in sous type change')
      console.log(data)  ; 
     }); 
  }

  onChangeofOptionsCanal(f){
    for (var i = 0; i <this.canalAll.length ; i++) {
      if(this.canalAll[i].id==f.value){
        this.formData.reclamation.canal.libelle=this.canalAll[i].libelle;
      }
  }
  }
  onChangeofOptionsCanalRep(f){
    for (var i = 0; i <this.canalAll.length ; i++) {
      if(this.canalReponseAll[i].id==f.value){
        this.formData.reclamation.canalreponse.libelle=this.canalReponseAll[i].libelle;
      }
  }
  }

  onChangeofOptionsidf(f){
    if(f['id']!= -1){
      (<HTMLInputElement>document.getElementById('allidfReadOnly')).readOnly 
    = true;
    (<HTMLInputElement>document.getElementById('allrcReadOnly')).readOnly 
    = true;
    this.service.getByIdf(f["id"]).subscribe(data => {
      this.formData.pms=data;
      console.log( this.formData.pms)
   });}
   else{
    (<HTMLInputElement>document.getElementById('allidfReadOnly')).readOnly 
    = false;
    (<HTMLInputElement>document.getElementById('allrcReadOnly')).readOnly 
    = false;
    this.formData['pms']={
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
  }

  onClickDeletePj(e,i){
    var x;
    this.selectedFiles = Array.from(this.selectedFiles);
       this.selectedFiles.splice(i,1);
    }
    

  onChangeofOptionsrc(f){
    this.service.getByRc(f.value).subscribe(data => {
      this.formData['pms']=data;
       console.log(this.formData['pms']);
      });
   /* if(f['id']!= -1){
      (<HTMLInputElement>document.getElementById('allidfReadOnly')).readOnly 
    = true;
    (<HTMLInputElement>document.getElementById('allrcReadOnly')).readOnly 
    = true;
    this.service.getByRc(f["id"]).subscribe(data => {
      this.formData.pms=data;
   });}
   else{
    (<HTMLInputElement>document.getElementById('allidfReadOnly')).readOnly 
    = false;
    (<HTMLInputElement>document.getElementById('allrcReadOnly')).readOnly 
    = false;
    this.formData['pms']={
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
  }*/
  } 

  onChangeofOptionsMail(f){
    if(f!= -1){
     this.service.getByMailpp(f).subscribe(data => {
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
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.formData =  {
      "reclamation":{
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
        "libelle": "مسجلة",
        "degre": 0
    },
      "canal": {
        "id": 0,
        "libelle": ""
    },
      "canalreponse": null,
      "pjReclamtion": 0,
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
   onSubmit() { 
     var dt=new Date(this.formData.reclamation.dateDepot);

     this.formData.reclamation.dateDepot=new Date(dt.getFullYear() + "/" 
     + (dt.getMonth() + 1) + "/" + dt.getDate()+' '+this.timeDepot.hour+':'+
     this.timeDepot.minute);
     
     if(this.formData.pps.id!=null){
      this.formData.reclamation.ppsourceReclamation=this.formData.pps.id;
      this.service.sendreclamation(this.formData.reclamation,this.selectedFiles).subscribe(res => {
        console.log(res)
        if(this.selectedFiles.length>0){   this.service.nouvellepj(this.selectedFiles,res).subscribe(res => {
        });}
          this.router.navigate(['/reclamations/reclamation-detail']);
         
          })
      }
      if(this.formData.pms.id!=null){
        this.formData.reclamation.pmsourceReclamation=this.formData.pms.id;
        this.service.sendreclamation(this.formData.reclamation,this.selectedFiles).subscribe(res => {
          if(this.selectedFiles.length>0){  this.service.nouvellepj(this.selectedFiles,res).subscribe(res => {
          });}
            this.router.navigate(['/reclamations/reclamation-detail']);
           
            })
      }

      if(this.formData.pps.id==null &&this.formData.pps.cin!="" ){
        this.service1.sendpp(this.formData.pps).pipe(
          flatMap((res) => this.sendreclam(res)),)
        .subscribe((resfork) => { 
          console.log(this.selectedFiles);
          if(this.selectedFiles.length>0){ 
             console.log("in here")
             console.log(resfork)
             this.service.nouvellepj(this.selectedFiles,resfork).subscribe(res => {
          });}
            this.router.navigate(['/reclamations/reclamation-detail']);
        })
      }

      if(this.formData.pms.id==null &&this.formData.pms.rc!=""){
        this.service2.sendpm(this.formData.pms).pipe(
          flatMap((res) => this.sendreclam1(res)),)
        .subscribe((resfork) => { 
          console.log(resfork)
          if(this.selectedFiles.length>0){   this.service.nouvellepj(this.selectedFiles,resfork).subscribe(res => {
          });}
           // this.router.navigate(['/reclamations/reclamation-detail']);
        })
      }
  }

  sendreclam(idpps){
    this.formData.reclamation.ppsourceReclamation=idpps;
    console.log(this.formData.reclamation)
    return this.service.sendreclamation(this.formData.reclamation,this.selectedFiles);
  }

  sendreclam1(idpms){
    console.log(idpms)
    this.formData.reclamation.pmsourceReclamation=idpms;
    console.log(this.formData.reclamation)
    return this.service.sendreclamation(this.formData.reclamation,this.selectedFiles);
  }

  
  save(event: any): void {
    this.selectedFiles = event.target.files;
   for (var i = 0; i < this.selectedFiles.length; i++) {
     // this.x=this.selectedFiles[i];
      /* this.result += '<br>File Name: ' + this.selectedFiles[i].name;
      this.result += '<br>File Size(byte): ' + this.selectedFiles[i].size;
      this.result += '<br>File Type: ' + this.selectedFiles[i].type;
      this.result += '<br>----------------------------'+this.selectedFiles[i];*/
     /* this.service.sendfile(this.selectedFiles[i]).subscribe(res => {
     
      })*/
    }} 

    
  
  
 

}
