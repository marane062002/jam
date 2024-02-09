import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { Location } from '@angular/common';

@Component({
  selector: 'kt-domaine-new', 
  templateUrl: './domaine-new.component.html',
  styleUrls: ['./domaine-new.component.scss']
})
export class DomaineNewComponent implements OnInit {

  loading = false;
  domaineForm: FormGroup;  
 // statuts:any; 
  arrondissements:any;
  addForm: FormGroup;  
  uploadFiles: Array<File>; 
  type1:string;
  addForm2: FormGroup;  
  uploadFiles2: Array<File>; 
  type2:string;
  dateErr=false
  
  
 
  constructor(private service:BienscommunalService,
    
    private router: Router,
    private fb:FormBuilder,
    private location:Location
  ) {  
    
    // this.getStatut()
    this.getArrondissement()
    
    
  }

  

  ngOnInit() {
    
    this.domaineForm = this.fb.group({      
       
      numDomaine: [null],
      nomDomaine:[null, Validators.required],
      // localisation:[null],
      dateDebutExploitation:[null],
      dateFinExploitation:[null],
      numAutorisation:[null],
      dateAutorisation:[null],
      // superficie:[null],	
      description:[null],	
      observation:[null],	
      dureeExploitation:[null],	
      typeDomaine:[null],
      statut:[null],
      arrondissement:[null],
      exploiteur:[null]
      
     	
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
    get f() { return this.domaineForm?this.domaineForm.controls:null; }
   
  //  getStatut(){
  //   this.service.getStatut()
  //   .then(data =>{this.statuts = data})
  // } 

  getArrondissement(){
    this.service.getArrondissement()
    .then(data =>{ this.arrondissements=data})
  }
  
  dateDiff(){
    let dateFE = this.domaineForm.controls['dateFinExploitation'].value
    let dateDE = this.domaineForm.controls['dateDebutExploitation'].value
    
    if(dateFE && dateDE){
      if(dateFE >= dateDE){ 
        let diff = dateFE.getTime() - dateDE.getTime();
        let duree = Math.round(Math.abs(diff/(1000*60*60*24)));
      this.domaineForm.controls['dureeExploitation'].setValue(duree)
      
      }else
       this.dateErr = true 
       
    }
    
    
   }
  

  onSubmit(){
 
    const formValues = this.domaineForm.value
    const controls = this.domaineForm.controls;
    /** check form */
 	if (this.domaineForm.invalid) {
    
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    this.loading = true;
      const domaine: any = Object.assign({}, formValues);
     console.log(domaine)
 
   this.service.saveDomaine(domaine) 
    .subscribe(data =>{
             let m:any=Object.assign({}, data);
               console.log(m.id)
              if(this.uploadFiles) 
                    this.service.updloadFilet(this.uploadFiles, m.id,this.type1,'/PjDomaines/multiplefile')
                    .subscribe(resp=>{console.log(resp)},
                    error => console.log(error))
             if(this.uploadFiles2)
              this.service.updloadFilet(this.uploadFiles2, m.id,this.type2,'/PjDomaines/multiplefile')
              .subscribe(resp=>{console.log(resp)},
              error => console.log(error))
              this.router.navigate(['domaine/domaine-index'])
    },error => console.log(error)
            );    
  }

  // back(){
  //   this.location.back()
  // }


  /**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.domaineForm.controls[controlName];
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
