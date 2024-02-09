import { Component, OnInit } from '@angular/core';

import { PresenceService } from '../../services/presence.service';
import { PersonnelService } from '../../services/personnel.service';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { OrganisationService } from '../../../organisation/organisation.service';

@Component({
  selector: 'kt-presence-new',
  templateUrl: './presence-new.component.html',
  styleUrls: ['./presence-new.component.scss']
})
export class PresenceNewComponent implements OnInit {

    loading = false; 
    isloading = false;
    presenceForm: FormGroup; 
    lignesPresence:FormArray;
    division = new FormControl(0);
    service = new FormControl({value: 0, disabled: true});
    divisions:any;
    services:any;
    personnels:any;
    motifs:any; 
    heuraires:any;
    presence:any;   
    
    
    
            
                       
                       
    constructor(private servicePresence:PresenceService,
      private servicePersonnel:PersonnelService,
      private serviceOrganisation: OrganisationService,
      private router: Router,
      private fb:FormBuilder
      
    ) {  
     
      
    }
  
    
    
    
    ngOnInit() {
   
      this.initPresenceForm();

      this.getData();
        
       
    }
    
    initPresenceForm(){
      this.presenceForm=this.fb.group({
                    
        date:[new Date().toISOString(), Validators.required],
        heuraire:[null, Validators.required], 
        libelle:[null, Validators.required],
        lignesPresence:this.fb.array([])
        }) 
    }
   async  filter(){
      this.loading = true;
       const idDivision = this.division.value
       const idService = this.service.value
       const liste = [idDivision,idService]

     
      await  this.servicePersonnel.getPersonnelsByDevisionAndService(liste)
       .subscribe(data => { 
         this.personnels = data[0]
      const control = <FormArray>this.presenceForm.controls.lignesPresence;
    
      
      this.personnels.forEach(personnel => {
       
          control.push(this.fb.group({
            idPersonnel:[personnel.id],
            absent:[false],
            motif:{value: null, disabled: true},
            descriptif:{value: null, disabled: true}
          }));
      });
      this.loading = false;
     
    }, err => {
      
      console.log(err);
      
    }
    );
  }
  async getData(){
    await this.servicePresence.getData()
    .subscribe(data => {
      this.divisions = data[0];
      this.heuraires = data[1];
      this.motifs = data[2];
      
    }, err => {
      
      console.log(err);
      
    }
    );
    
   
 
  }
  getServices(ob){
    
    const id = ob.value
    if(id != 0){ 
    this.service.enable()
    this.serviceOrganisation.getRessourceById(id,'/services/divisions/')
    .subscribe(data =>{ this.services =data  
    
       },
      error => console.log(error)
    );
  }else{
    this.service.setValue(0)
    this.service.disable()
  }
  } 
    
    onSubmit(){
      const formValues = this.presenceForm.value
    const controls = this.presenceForm.controls; 
    /** check form */
		if (this.presenceForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    this.isloading = true;
      this.presence = Object.assign({}, formValues);
    
     
     
      this.servicePresence.postRessource(this.presence,"/presences/new")
      .subscribe(data => {console.log(data),  this.gotoList()},
                error => console.log(error)
              ); 
      
     
    }
  
    isAbsent(e,i){
     const ligne = this.presenceForm.get('lignesPresence') as FormArray;
     if(e.checked){
      ligne.controls[i].get('motif').enable();
      ligne.controls[i].get('descriptif').enable();
     }
      
     else{
      ligne.controls[i].get('motif').reset();
      ligne.controls[i].get('descriptif').reset(); 
      ligne.controls[i].get('motif').disable();
      ligne.controls[i].get('descriptif').disable();
     }
     
     
      
    }
  
    
    
    gotoList() {
      this.router.navigate(['/presence/presence-index']);
    }
  
 /**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.presenceForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

}
