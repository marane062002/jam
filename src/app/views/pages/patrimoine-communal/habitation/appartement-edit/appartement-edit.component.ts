import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BienscommunalService } from '../../services/bienscommunal.service';

@Component({
  selector: 'kt-appartement-edit',
  templateUrl: './appartement-edit.component.html',
  styleUrls: ['./appartement-edit.component.scss']
})
export class AppartementEditComponent implements OnInit {

  id:number;
  idParent:number;
  habitationId:number;
  editForm: FormGroup; 
  submitted = false;
  destinations:any;
  appartement:any;
  dateErr=false

  loading = false;
 
  addPhotosForm: FormGroup; 
  public uploadPhotosFiles: Array<File>; 
  

  constructor(private formBuilder: FormBuilder,
              private router: Router, 
              private service:BienscommunalService,
              private location:Location,              
              private route:ActivatedRoute) { 
                this.route.queryParams.subscribe(params => {
                  this.id= params['id'];
                  this.idParent= params['id'];
                });
               
              }

  ngOnInit() {
      
    this.editForm = this.formBuilder.group({
      id:[null],
      numAppartement:[null, Validators.required],
      superficie:[null],
      situation:[null],
      
      dateDernierChg:[null],
      
      
      contenance:[null],
      debutExploitation:[null],
      finExploitation:[null],
      habitation:[null],
      dureeExploitation:[null],
      observation:[null],
      destinationEco:[null]
      })
      
      
      this.addPhotosForm = this.formBuilder.group({
        _file2: []
      });
     
      this.getData(this.id)
     
     
     
  }
  getData(id){
          this.service.getAppartementEditData(id)
    .then( data => {
      this.editForm.patchValue(data[0]);
      this.editForm.get('debutExploitation').patchValue(new Date(data[0].debutExploitation).toISOString())
      this.editForm.get('finExploitation').patchValue(new Date(data[0].finExploitation).toISOString())
      this.editForm.get('dateDernierChg').patchValue(new Date(data[0].dateDernierChg).toISOString())
      this.destinations = data[1];
    
     
    });
    
  }

  dateDiff(){
    let dateFE = this.editForm.controls['finExploitation'].value
    let dateDE = this.editForm.controls['debutExploitation'].value
    
    if(dateFE && dateDE){
      if(dateFE >= dateDE){ 
        let diff = dateFE.getTime() - dateDE.getTime();
        let duree = Math.round(Math.abs(diff/(1000*60*60*24)));
      this.editForm.controls['dureeExploitation'].setValue(duree)
      
      }else
       this.dateErr = true 
       
    }
    
    
   }
  
  

      compare(val1, val2) {
        if(val1 && val2)
        return val1.id === val2.id;

      }

      back(){
        this.location.back()
      }

      onSubmit(){
        const formValues = this.editForm.value
        const appt: any = Object.assign({}, formValues);
        const controls = this.editForm.controls;
    /** check form */
		if (this.editForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    
     
        
     this.loading = true
       this.service.updateAppartement(appt,appt.id)
        .subscribe(data =>{ console.log(data) 
         /*  this.service.updloadFile(this.uploadActeFiles, this.id,'/PjMagasinActes/multiplefile')
          .subscribe(resp=>{console.log(resp)},
          error => console.log(error)) */
          /* if(this.uploadPhotosFiles)
          this.service.updloadFile(this.uploadPhotosFiles, this.id,'/PjApptPhotos/multiplefile')
          .subscribe(resp=>{console.log(resp),this.loading = true;},
          
          error => console.log(error)) */
          
          this.router.navigate(['habitation/habitation-show/'], { queryParams: { id: appt.habitation.id} })},
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
		const control = this.editForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

 // ============================================
	// Upload file event
	// ============================================
	/* fileChange(event) {
		this.uploadActeFiles = event.target.files;
		console.log(this.uploadActeFiles)
		if (event.target.files.length > 0) {
			console.log("target : " + event.target.files.length);
			const file = event.target.files[0];
			this.addActeForm.patchValue(this.uploadActeFiles);
		
		} 

  } */
  filePhotosChange(event) {
		this.uploadPhotosFiles = event.target.files;
		
		if (event.target.files.length > 0) {
			console.log("target : " + event.target.files.length);
			const file = event.target.files[0];
			this.addPhotosForm.patchValue(this.uploadPhotosFiles);
		
		} 

	}


}
