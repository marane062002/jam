import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjetService } from '../../services/projet.service';
import { Router } from '@angular/router';
import * as $ from "jquery";
@Component({
  selector: 'kt-prestataire-new',
  templateUrl: './prestataire-new.component.html',
  styleUrls: ['./prestataire-new.component.scss']
})
export class PrestataireNewComponent implements OnInit {

  loading = false;
  prestataireForm: FormGroup;    
  addForm2: FormGroup;  
  uploadFiles2: Array<File>; 
  type2:string;                
                   
  constructor(private service:ProjetService,
    
    private router: Router,
    private fb:FormBuilder
    
  ) {  
    
    
  }

  
  

  ngOnInit() {
    
    this.prestataireForm = this.fb.group({      
       
      raisonSociale: ['',   Validators.required],
      rc:['', Validators.required],
      villeRegistreCommerce:['', Validators.required],		   
      identifiantFiscale:[null, Validators.required],	
      numeroPatente:[null, Validators.required],	
      adresse:[null, Validators.required],	
      teleFixe:[null, Validators.compose([Validators.pattern("[0-9]*"), Validators.required])],
      teleGsm:[null,Validators.pattern("[0-9]*")],
      fax:[null,Validators.pattern("[0-9]*")],
      email: ['', Validators.email],
      siteWeb:[null],
      contact:[null],	   

      })

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



  onSubmit(){
    const formValues = this.prestataireForm.value
    const controls = this.prestataireForm.controls;
    /** check form */
		if (this.prestataireForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    this.loading = true;
      const prestataire: any = Object.assign({}, formValues);
     
 
   this.service.savePrestataire(prestataire)
    .subscribe(data =>{
              let m:any=Object.assign({}, data);
             
              if(this.uploadFiles2)
              this.service.updloadFilet(this.uploadFiles2, m.id,this.type2,'/PjPrestataires/multiplefile')
              .subscribe(resp=>{console.log(resp)},
              error => console.log(error))
              this.router.navigate(['prestataire/prestataire-index']) 
              
               },
              error => console.log(error)
            );   
  }


  /**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.prestataireForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
// ============================================
	// Upload file event
	// ============================================

  fileChange2(event,type) {
    this.uploadFiles2 = event.target.files;
    this.type2 = type
		
		if (event.target.files.length > 0) {
			console.log("target : " + event.target.files.length);
		
			this.addForm2.patchValue(this.uploadFiles2);
     
		} 

  }

}
