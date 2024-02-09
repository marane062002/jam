import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NotationService } from '../../services/notation.service';
import { PersonnelService } from '../../services/personnel.service';
import { Router } from '@angular/router';
import { OrganisationService } from '../../../organisation/organisation.service';

@Component({
  selector: 'kt-notation-new',
  templateUrl: './notation-new.component.html',
  styleUrls: ['./notation-new.component.scss']
})
export class NotationNewComponent implements OnInit {

  // ============================================
	// Declarations
	// ============================================
  loading= false;
  isloading = false;
  notationForm: FormGroup; 
  division = new FormControl(0, Validators.required);
  service = new FormControl({value: 0, disabled: true});
  divisions:any;
  services:any;
  personnels:any;  
  compagnes:any;   
        
                     
                     
  constructor(private serviceNotation:NotationService,
    private servicePersonnel:PersonnelService,
    private serviceOrganisation: OrganisationService,
    
    private router: Router,
    private formBuilder:FormBuilder
    
  ) {  
    this.getData() 
    
  }

  
  
  
  ngOnInit() {
    this.notationForm=this.formBuilder.group({
       
       
      annee:[null, Validators.required],
      notation:['', Validators.required],      		   
      appreciation:[null],  
      idPersonnel:[null, Validators.required],
     
      })
   
      
  }

  async getData(){
    await this.serviceNotation.getData()
    .subscribe(data => {
      this.divisions = data[0];
      this.compagnes = data[1];
      
      
    }, err => {
      console.log(err); 
      
    }
    );
  }

  // ============================================
	// Charger les services d'une division
	// ============================================

  getServices(ob){
    
    const id = ob.value
    if(id != 0){ 
    this.service.enable()
    this.serviceOrganisation.getDivisionServices(id)
    .subscribe(data =>{ this.services =data  
    
       },
      error => console.log(error)
    );
  }else{
    this.service.setValue(0)
    this.service.disable()
  }
  } 
 
 
  async filter(){
    this.loading = true;
     const idDivision = this.division.value
     const idService = this.service.value
     const liste = [idDivision,idService]

   
    await this.servicePersonnel.getPersonnelsByDevisionAndService(liste)
     .subscribe(data => { 
       this.personnels = data[0]
   
    this.loading = false;
    
  }, err => {
    
    console.log(err);
    
  }
  );
}
  onSubmit(){
    const controls = this.notationForm.controls; 
    /** check form */
		if (this.notationForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    this.isloading = true;

   this.serviceNotation.postRessource(Object.assign({}, this.notationForm.value),"/notations/new")
    .subscribe(data => {console.log(data), this.gotoList()},
              error => console.log(error)
            );
    
    
  }

  
  

  
  gotoList() {
    this.router.navigate(['notation/notation-index']);
  }

  /**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.notationForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

}
