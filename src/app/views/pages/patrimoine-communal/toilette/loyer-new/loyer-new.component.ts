import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from "jquery";
import { Location } from '@angular/common';
@Component({
  selector: 'kt-loyer-new',
  templateUrl: './loyer-new.component.html',
  styleUrls: ['./loyer-new.component.scss']
})
export class LoyerNewComponent implements OnInit {

  loading = false;
  loyerForm: FormGroup;   
  id:number; 
  duree:number;
  locataires:any;
  addForm: FormGroup;  
  uploadFiles: Array<File>; 
  type1:string;
  addForm2: FormGroup;  
  uploadFiles2: Array<File>; 
  type2:string;
  annees =Array();
  mois = [{'id':0,'libelle':'يناير'},{'id':1,'libelle':'فبراير'},{'id':2,'libelle':'مارس'},{'id':3,'libelle':'أبريل'},{'id':4,'libelle':'ماي'},{'id':5,'libelle':'يونيو'},{'id':6,'libelle':'يوليوز'},{'id':7,'libelle':'غشت'},{'id':8,'libelle':'شتنبر'},{'id':9,'libelle':'أكتوبر'},{'id':10,'libelle':'نونبر'},{'id':11,'libelle':'دجنبر'}];
  dateSys = new Date();
 
   
 
  constructor(private service:BienscommunalService,
    private location:Location,
    private router: Router,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    
  ) {  
    for(let i = 1950; i <= 2200; i++) this.annees.push(i);
    this.route.queryParams.subscribe(params => {
      this.id= params['id'];
    });
 
    this.getLocataires();
    
  }

  

  ngOnInit() {
    
    this.loyerForm = this.fb.group({      
       
      numActeLocation: ['', Validators.compose([
              Validators.required,
                  ])
                  ],
      observation:[null],
      dateActe:[null],
      montantLoyer:[0,Validators.required],
      montantImpaye:[0],
      anneeDebut:[null,Validators.required],
      moisDebut:[null,Validators.required],
      anneeEnCours:[null],
      moisEnCours:[null],
      locataire:['',Validators.required],
      toilette:[{id:this.id}],
      ligneloyers: new FormArray([])	
      })
      this.addForm = this.fb.group({
        _file: []
      });
      this.addForm2 = this.fb.group({
        _file: []
      });

      $(function () {
        // We can attach the `fileselect` event to all file inputs on the page
        $(document).on("change", ":file", function () {
          var input = $(this),
            numFiles = input.get(0).files
              ? input.get(0).files.length
              : 1,
            label =  (new String(input.val())).replace(/\\/g, "/").replace(/.*\//, "");
          input.trigger("fileselect", [numFiles, label]);
        });
  
        // We can watch for our custom `fileselect` event like this
        $(document).ready(function () {
          $(":file").on("fileselect", function (event, numFiles, label) {
            var input = $(this).parents(".input-group").find(":text"),
              log = numFiles > 1 ? numFiles + " وثائق مختارة" : label;
  
            if (input.length) {
              input.val(log);
            } else {
              if (log) alert(log);
            }
          });
        });
      });
  }
    get f() { return this.loyerForm?this.loyerForm.controls:null; }
   get m() { return this.f?this.f.ligneloyers as FormArray:null; }
    
    getLocataires(){
      this.service.getLocataires()
      .then(data => this.locataires = data)
      
    }
  
    
  
  onSubmit(){
    
  this.getLignesLoyer()
    const formValues = this.loyerForm.value
    const controls = this.loyerForm.controls;
    
 	if (this.loyerForm.invalid) {
    
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    this.loading = true;
      const loyer: any = Object.assign({}, formValues);
    
 
   this.service.saveLoyerToilette(loyer)
    .subscribe(data =>{
      let m:any=Object.assign({}, data);
               
      if(this.uploadFiles) 
            this.service.updloadFilet(this.uploadFiles, m.id,this.type1,'/PjLoyersToilettes/multiplefile')
            .subscribe(resp=>{console.log(resp)},
            error => console.log(error))
     if(this.uploadFiles2)
      this.service.updloadFilet(this.uploadFiles2, m.id,this.type2,'/PjLoyersToilettes/multiplefile')
      .subscribe(resp=>{console.log(resp)},
      error => console.log(error))
      this.router.navigate(['toilette/toilette-show'], { queryParams: { id: loyer.toilette.id } })
              
               },
              error => console.log(error)
            );    
  }

  getLignesLoyer(){
    const anneeD = this.loyerForm.controls['anneeDebut'].value
    const moisD = this.loyerForm.controls['moisDebut'].value
    const anneeS = this.dateSys.getFullYear()
    const moisS = this.dateSys.getMonth()
    const montantLoyer = this.loyerForm.controls['montantLoyer'].value
    this.duree = (anneeS - anneeD)*12 + moisS - moisD 
     if(this.duree > 0 ){
        
        this.loyerForm.controls['montantImpaye'].setValue(this.duree * montantLoyer)
        this.loyerForm.controls['anneeEnCours'].setValue(anneeS)
        this.loyerForm.controls['moisEnCours'].setValue(moisS)
        this. ajouterLignes(this.duree,moisD,anneeD) 
     }     
      
        

  
  }

  ajouterLignes(nb,m,annee) {
    
    for (let i = nb; i > 0; i--) {
      if(m==12) {m = 0; annee++}
      //console.log(this.mois[m].libelle +' '+ annee) 
      
    this.m.push(this.fb.group({
      anneeLoyer: [annee],
      moisLoyer: [m],
      etatReglement: ['false'],
     
           
    }));
    m++
  }
}

  back(){
    this.location.back()
  }

  /**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loyerForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
  }
  
   // ============================================
	// Upload file event
	// ============================================
	fileChange1(event,type) {
    this.uploadFiles = event.target.files;
    this.type1 = type
		
		if (event.target.files.length > 0) {
			console.log("target : " + event.target.files.length);
			
			this.addForm.patchValue(this.uploadFiles);
		
		} 
 
  }
  fileChange2(event,type) {
    this.uploadFiles2 = event.target.files;
    this.type2 = type
		
		if (event.target.files.length > 0) {
			console.log("target : " + event.target.files.length);
		
			this.addForm2.patchValue(this.uploadFiles2);
     
		} 

  }
 

}