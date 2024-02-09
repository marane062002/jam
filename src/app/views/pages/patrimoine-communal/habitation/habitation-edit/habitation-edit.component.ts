import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BienscommunalService } from '../../services/bienscommunal.service';

@Component({
  selector: 'kt-habitation-edit',
  templateUrl: './habitation-edit.component.html',
  styleUrls: ['./habitation-edit.component.scss']
})
export class HabitationEditComponent implements OnInit {
  
  loading = false;
  habitationForm: FormGroup;    
  addDocForm: FormGroup;  
  public uploadDocFiles: Array<File>; 
  addPhotosForm: FormGroup; 
  public uploadPhotosFiles: Array<File>; 
  id:number
  
 
  constructor(private service:BienscommunalService,
    private route:ActivatedRoute,
    private router: Router,
    private fb:FormBuilder,
    private location:Location
    
  ) {  
    
    this.route.queryParams.subscribe(params => {
      this.id= params['id'];
    });

    console.log('ID: ' + this.id);

    this.habitationForm=this.fb.group({
      id: [this.id],
      numHabitation: ['', Validators.required],
      localisation:[''],
      dateDebutExploitation:[''],
      nomHabitation:['', Validators.required],
      nombreAppartement:['', Validators.required],
      superficie:[''],	
      description:[''],	
      observation:[''],	
      typeHabitation:[''],
      statutLegalHabitation:[''],
      natureHabitation:[''],
      numConservationFonciere:[''],
      appartements: new FormArray([])	  
    })

    this.addDocForm = this.fb.group({
      _file: []
    });
    this.addPhotosForm = this.fb.group({
      _file2: []
    });

    this.service.getHabitationById(this.id).then(data=>{
       console.log(JSON.stringify(data,null,4));
       this.habitationForm.patchValue(data);
       //this.patrimoineForm.get('dateInscription').patchValue(new Date(data[0].dateInscription).toISOString())
       this.habitationForm.get('dateDebutExploitation').patchValue(new Date(data.dateDebutExploitation).toISOString())
    })
    
  }


  ngOnInit() {
    
      
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

  
  getHabitation(id:number){
   // this.service.
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
