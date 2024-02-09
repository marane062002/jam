import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-habitation-new',
  templateUrl: './habitation-new.component.html',
  styleUrls: ['./habitation-new.component.scss']
})
export class HabitationNewComponent implements OnInit {
  loading = false;
  habitationForm: FormGroup;    
  addDocForm: FormGroup;  
  public uploadDocFiles: Array<File>; 
  addPhotosForm: FormGroup; 
  public uploadPhotosFiles: Array<File>; 
 
  constructor(private service:BienscommunalService,
    
    private router: Router,
    private fb:FormBuilder
    
  ) {  
    
    
  }

  

  ngOnInit() {
    
    this.habitationForm = this.fb.group({      
       
      numHabitation: ['', Validators.compose([
              Validators.required,
                  ])
                  ],
      localisation:[null],
      dateDebutExploitation:[null],
      nomHabitation:['', Validators.required],
      nombreAppartement:[null, Validators.required],
      superficie:[null],	
      description:[null],	
      observation:[null],	
      typeHabitation:[null],
      natureHabitation:[null],
      numConservationFonciere:[null],
      statutLegalHabitation:[null],
      appartements: new FormArray([])	   
      
      
       

     	
      })

      this.addDocForm = this.fb.group({
        _file: []
      });
      this.addPhotosForm = this.fb.group({
        _file2: []
      });
     
  }
    get f() { return this.habitationForm?this.habitationForm.controls:null; }
    get m() { return this.f?this.f.appartements as FormArray:null; }
 
  
    ajouterAppartements() {
    
      const nb = this.f.nombreAppartement.value;
      console.log(nb)
      for (let i = 0; i < nb; i++) {
      this.m.push(this.fb.group({
        numAppartement: [''],
             
      }));
    }
}
  
  onSubmit(){
   
    const formValues = this.habitationForm.value
    const controls = this.habitationForm.controls;
   
 	if (this.habitationForm.invalid) {
    
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    this.loading = true;
      const habitation: any = Object.assign({}, formValues);
     console.log(habitation)
 
   this.service.saveHabitation(habitation) 
    .subscribe(data =>{
           let m:any=Object.assign({}, data);
               console.log(m.id)
             /*  if(this.uploadDocFiles)  
              this.service.updloadFile(this.uploadDocFiles, m.id,'/PjHabitationDocs/multiplefile')
              .subscribe(resp=>{console.log(resp)},
              error => console.log(error))
              if(this.uploadPhotosFiles)
              this.service.updloadFile(this.uploadPhotosFiles, m.id,'/PjHabitationPhotos/multiplefile')
              .subscribe(resp=>{console.log(resp)},
              error => console.log(error)) */
              this.router.navigate(['habitation/habitation-index'])
    },error => console.log(error)
            );    
  }

  

  

  /**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.habitationForm.controls[controlName];
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
		this.uploadDocFiles = event.target.files;
		console.log(this.uploadDocFiles)
		if (event.target.files.length > 0) {
			console.log("target : " + event.target.files.length);
			const file = event.target.files[0];
			this.addDocForm.patchValue(this.uploadDocFiles);
		
		} 

  }
  filePhotosChange(event) {
		this.uploadPhotosFiles = event.target.files;
		
		if (event.target.files.length > 0) {
			console.log("target : " + event.target.files.length);
			const file = event.target.files[0];
			this.addPhotosForm.patchValue(this.uploadPhotosFiles);
		
		} 

	}
}
