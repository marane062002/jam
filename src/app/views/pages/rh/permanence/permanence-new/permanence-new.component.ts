import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PermanenceService } from '../../services/permanence.service';
import { PersonnelService } from '../../services/personnel.service';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { OrganisationService } from '../../../organisation/organisation.service';

@Component({
  selector: 'kt-permanence-new',
  templateUrl: './permanence-new.component.html',
  styleUrls: ['./permanence-new.component.scss']
})
export class PermanenceNewComponent implements OnInit {

  // ============================================
	// Declarations
	// ============================================
  loading= false;
  isloading = false;
  permanenceForm: FormGroup; 
  division = new FormControl(0, Validators.required);
  service = new FormControl({value: 0, disabled: true});
  divisions:any;
  services:any;
  personnels:any;    
  time1:any;
	time2:any;
   

                     
  constructor(private servicePermanence:PermanenceService,
    private servicePersonnel:PersonnelService,
    private serviceOrganisation: OrganisationService,
    private router: Router,
    private formBuilder:FormBuilder
    
  ) {  
   this.getDivisions()
   var currentDate: Date = new Date();
		this.time1 = { hour: currentDate.getHours(), minute: currentDate.getMinutes()};
		this.time2 = { hour: currentDate.getHours(), minute: currentDate.getMinutes()};
    
  }

  
  
  
  ngOnInit() {
    this.initPermanenceForm();

  }

  initPermanenceForm(){
    this.permanenceForm=this.formBuilder.group({
       
       
      date:[null, Validators.required],
      heureDebut:[null, Validators.required],
      heureFin:[null, Validators.required],		   
      remarque:[null],  
      idPersonnel:{value:null,disabled:true}
      })
  }


  // ============================================
	// Charger les divisions
	// ============================================
  async getDivisions(){
    await this.serviceOrganisation.getDivisions()
    .subscribe(data => {this.divisions = data[0]
     
    });

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
       this.permanenceForm.get('idPersonnel').enable()
       this.loading = false
      
      }
   
  )
}
  onSubmit(){
    
    const controls = this.permanenceForm.controls; 
    /** check form */
		if (this.permanenceForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    this.isloading = true;
    
    this.permanenceForm.get("heureDebut").setValue(this.time1.hour+':'+this.time1.minute+':'+'00');
		this.permanenceForm.get("heureFin").setValue(this.time2.hour+':'+this.time2.minute+':'+'00');
      const permanence = Object.assign({}, this.permanenceForm.value);
    
     console.log(permanence)
     
      this.servicePermanence.postRessource(permanence,"/permanences/new")
      .subscribe(data => {console.log(data),  this.gotoList()},
                error => console.log(error)
              ); 
      
     
    
  }

  
  

  
  gotoList() {
    this.router.navigate(['permanence/permanence-index']);
  }

  /**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.permanenceForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

}
