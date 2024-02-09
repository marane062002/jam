import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BienscommunalService } from '../../services/bienscommunal.service';

@Component({
  selector: 'kt-magasin-edit',
  templateUrl: './magasin-edit.component.html',
  styleUrls: ['./magasin-edit.component.scss']
})
export class MagasinEditComponent implements OnInit {

  id:number;
  idParent:number;
  marcheId:number;
  editForm: FormGroup; 
  submitted = false;
  destinations:any;
  dateErr = false
  
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
                  this.idParent=params['idParent'];
                });
                this.getMagasinData(this.id)
              } 

  ngOnInit() {
      
    this.editForm = this.formBuilder.group({
      id:[null],
      numMagasin:[null, Validators.required],
      numSessionBoutique:[null, Validators.required],
      superficie:[null],
      situation:[null],
      natureMagasin:[null],
      
      dateDernierChg:[null],
      
  //    contenance:[null],
      debutExploitation:[ new Date().toISOString()],
      finExploitation:[new Date().toISOString() ],
      marche:[],
      dureeExploitation:[null],
      observation:[null],
//      destinationEco: this.formBuilder.group({ id : []}),
 //     destinationEco:[null]
      activitEconomic:[null]
      })
      
      
      this.addPhotosForm = this.formBuilder.group({
        _file2: []
      });
     
     
  }
  getMagasinData(id){
   
    this.service.getMagasinData(id)
    .then( data => {
     // this.marcheId = data[0].marche.id;
      this.editForm.patchValue(data[0]);
      // this.editForm.get('debutExploitation').patchValue(new Date(data[0].debutExploitation).toISOString())
      // this.editForm.get('finExploitation').patchValue(new Date(data[0].finExploitation).toISOString())
      // this.editForm.get('dateDernierChg').patchValue(new Date(data[0].dateDernierChg).toISOString())
      this.destinations = data[1]
    });
   
   
  }
  
  changeDate(){
 //   debutExploitation finExploitation  dureeExploitation
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

      onSubmit(){
        const formValues = this.editForm.value
        const magasin: any = Object.assign({}, formValues);
        const controls = this.editForm.controls;
    /** check form */
		if (this.editForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    
    this.loading =true
        
     
       this.service.updateMagasin(magasin,this.id)
        .subscribe(data =>{ console.log(data);
         /*  this.service.updloadFile(this.uploadActeFiles, this.id,'/PjMagasinActes/multiplefile')
          .subscribe(resp=>{console.log(resp)},
          error => console.log(error)) */
          if(this.uploadPhotosFiles)
                this.service.updloadFile(this.uploadPhotosFiles, this.id,'/PjMagasinPhotos/multiplefile')
                .subscribe(resp=>{console.log(resp),this.loading = true;},
                
                error => console.log(error))
          
                this.router.navigate(['/marche/marche-show'], { queryParams: { id: magasin.marche.id } })
//                this.router.navigate(['/marche/marche-show'], {queryParams: {id : this.idParent}})
                  error => console.log(error)
         } );
      
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
