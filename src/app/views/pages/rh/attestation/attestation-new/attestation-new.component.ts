import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AttestationService } from '../../services/attestation.service';

import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { User, currentUser } from '../../../../../core/auth';
import { Store,select } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import * as $ from "jquery";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-attestation-new',
  templateUrl: './attestation-new.component.html',
  styleUrls: ['./attestation-new.component.scss']
})
export class AttestationNewComponent implements OnInit {

   // ============================================
	// Declarations
	// ============================================
 
  isloading = false;
  demandeForm: FormGroup; 
  user$: Observable<User>;
  idPersonnel:number;
  pjsForm: FormGroup;   
  public uploadPjsFiles: Array<File>;
  types:any;                 
                      
                     
  constructor(private serviceAttestation:AttestationService,
    
    private store: Store<AppState>,
    private router: Router,
    private translate: TranslateService,
    private formBuilder:FormBuilder
    
  ) {  
    this.getPersonnel()
    this.getType()
    
  }

  
  
  
  ngOnInit() {
    this.demandeForm=this.formBuilder.group({
      type:[null, Validators.required],     		   
      note:[null],   
      idPersonnel:[this.idPersonnel]
      })
      this.pjsForm = this.formBuilder.group({
        _file: [],
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
  public getPersonnel(){
    this.user$ = this.store.pipe(select(currentUser));
    
    this.user$.subscribe(user =>{
      
      this.idPersonnel = user.idPersonnel})
    }
  async getType(){
   await  this.serviceAttestation.getType()
    .subscribe(data => {
     
      this.types = data[0];
      
       
    }, err => {
      console.log(err);
      
    }
    );
  }
 
 
  onSubmit(){

    const controls = this.demandeForm.controls; 
    /** check form */
		if (this.demandeForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    this.isloading = true;    
    
      const demande = Object.assign({}, this.demandeForm.value);
    
     
      this.serviceAttestation.postRessource(demande,"/demandes/new")
      .then(data => {
        let d:any=Object.assign({}, data);
        if(this.uploadPjsFiles) 
        this.serviceAttestation.updloadFileAttestation(this.uploadPjsFiles, d.id)
        .then(resp=>{console.log(resp)
          
        },
        error => console.log(error))
        this.gotoList()
       },
                error => console.log(error)
              ); 
    
  }

  
  

  
  gotoList() {
    this.router.navigate(['attestation/attestation-index']);
  }

  /**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.demandeForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
  }
  

  // ============================================
	// Upload file event
	// ============================================
	fileChange(event) { 
    console.log('ok')
		this.uploadPjsFiles = event.target.files;
	
		if (event.target.files.length > 0) {
      console.log("target : " + event.target.files.length);
      const file = event.target.files[0];
			this.pjsForm.patchValue(this.uploadPjsFiles);
			console.log("OK get");
		}
	}

}
