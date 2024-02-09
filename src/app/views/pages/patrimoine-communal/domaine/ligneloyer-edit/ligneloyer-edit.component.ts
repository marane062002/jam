import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from "jquery";
import { Location } from '@angular/common';
@Component({
  selector: 'kt-ligneloyer-edit',
  templateUrl: './ligneloyer-edit.component.html',
  styleUrls: ['./ligneloyer-edit.component.scss']
})
export class LigneloyerEditComponent implements OnInit {

  loading = false;
  lloyerForm: FormGroup;   
  id:number; 
  idloyer:number;
  montantLoyer:number;
  ligneLoyer:any;
  addForm: FormGroup;  
  uploadFiles: Array<File>; 
  type1:string;
  addForm2: FormGroup;  
  uploadFiles2: Array<File>; 
  type2:string;
  mois = [{'id':0,'libelle':'يناير'},{'id':1,'libelle':'فبراير'},{'id':2,'libelle':'مارس'},{'id':3,'libelle':'أبريل'},{'id':4,'libelle':'ماي'},{'id':5,'libelle':'يونيو'},{'id':6,'libelle':'يوليوز'},{'id':7,'libelle':'غشت'},{'id':8,'libelle':'شتنبر'},{'id':9,'libelle':'أكتوبر'},{'id':10,'libelle':'نونبر'},{'id':11,'libelle':'دجنبر'}];
   
 
  constructor(private service:BienscommunalService,
    
    private router: Router,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private location:Location
    
  ) {  
    
    this.route.queryParams.subscribe(params => {
      this.id= params['id'];
    });
    this.getLloyer();
    
    
    
  }

  

  ngOnInit() {
    
    this.lloyerForm = this.fb.group({      
       id:[null],
      anneeLoyer: ['', Validators.compose([
              Validators.required,
                  ])
                  ],
      observation:[null],
      moisLoyer:[null,Validators.required],
      etatReglement:['false'],
      numRecu:[null],
      datePaiement:[null],
      loyer:[null]
      
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
    get f() { return this.lloyerForm?this.lloyerForm.controls:null; }
    getLloyer(){
      this.service.getLigneLoyerDomaineById(this.id)
      .then(data => {
        this.ligneLoyer=data
       
        this.idloyer = data.loyer.id,
        
        this.lloyerForm.patchValue(data)

        if(data.datePaiement)
        this.lloyerForm.get('datePaiement').patchValue(new Date(data.datePaiement).toISOString())
        this.etatInit(data.etatReglement)
      })
        
    }
   

    etatChange(){
      
      const etat = this.lloyerForm.controls['etatReglement'].value
      
      if(etat == 'true'){
        this.lloyerForm.controls['datePaiement'].enable();
        this.lloyerForm.controls['numRecu'].enable();
      }
      else{
       
        this.lloyerForm.controls['datePaiement'].patchValue(null);
       
        this.lloyerForm.controls['numRecu'].patchValue(null);
        this.lloyerForm.controls['datePaiement'].disable();
        this.lloyerForm.controls['numRecu'].disable();
      }
   
    } 
    etatInit(etat){
      
      
      if(etat == 'true'){
        this.lloyerForm.controls['datePaiement'].enable();
        this.lloyerForm.controls['numRecu'].enable();
      }
      else{
       
        this.lloyerForm.controls['datePaiement'].patchValue(null);
       
        this.lloyerForm.controls['numRecu'].patchValue(null);
        this.lloyerForm.controls['datePaiement'].disable();
        this.lloyerForm.controls['numRecu'].disable();
      }
   
    } 
  
  onSubmit(){
   
    const formValues = this.lloyerForm.value
    const controls = this.lloyerForm.controls;
    /** check form */
 	if (this.lloyerForm.invalid) {
    
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    this.loading = true;
      const lloyer: any = Object.assign({}, formValues);
    
 
   this.service.updateLigneLoyerDomaine(lloyer,this.id)
    .subscribe(data =>{
      let m:any=Object.assign({}, data);

      if(this.uploadFiles) 
            this.service.updloadFilet(this.uploadFiles, m.id,this.type1,'/PjLignesLoyerDomaine/multiplefile')
            .subscribe(resp=>{console.log(resp)},
            error => console.log(error))
     if(this.uploadFiles2)
      this.service.updloadFilet(this.uploadFiles2, m.id,this.type2,'/PjLignesLoyerDomaine/multiplefile')
      .subscribe(resp=>{console.log(resp)},
      error => console.log(error))

              this.router.navigate(['domaine/loyer-show/'], { queryParams: { id: lloyer.loyer.id } }) 
             
              
               },
              error => console.log(error)
            );    
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
		const control = this.lloyerForm.controls[controlName];
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