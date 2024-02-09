import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ProjetService } from '../../../services/projet.service';

@Component({
  selector: 'kt-phase-new',
  templateUrl: './phase-new.component.html',
  styleUrls: ['./phase-new.component.scss']
})
export class PhaseNewComponent implements OnInit {

  loading = false;
  id:number;
  phaseForm: FormGroup; 
  projets:any;  
  statuts:any; 
  constructor(private service:ProjetService,
    private router: Router,
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private location:Location
    
  ) {  
    this.route.queryParams.subscribe(params => {
      this.id= params['id'];
    });
    
    this.getStatuts()
  }
  

  ngOnInit() {
    
    this.phaseForm = this.fb.group({      
       
      designation: ['', Validators.compose([
              Validators.required,
                  ])
                  ],
      descriptif:[null],
      projet:[{id:this.id}],
      dateDebutPrevue:[''],		   
      dateFinPrevue:[null],	
      dureeEstimee:[null],	
      dateDebutReelle:[''],		   
      dateFinReelle:[null],	
      dureeReelle:[null],
      budgetPhase:[null],
      statut:[null, Validators.required],
     	
      })
     
  }
 
  getStatuts(){
    this.service.getStatuts()
    .then(data => {
          this.statuts = data;
      
    }, err => {
      console.log(err);
      
    }
    );
  }
  
  dateChange(){
   let dateFp = this.phaseForm.controls['dateFinPrevue'].value
   let dateDp = this.phaseForm.controls['dateDebutPrevue'].value
   
   if(dateFp && dateDp){
     if(dateFp >= dateDp){ 
      let diffc = dateFp.getTime() - dateDp.getTime();
     let duree = Math.round(Math.abs(diffc/(1000*60*60*24)));
     this.phaseForm.controls['dureeEstimee'].setValue(duree)
     
     }
      
   }
    
   
  }
  dateRChange(){
    let dateFp = this.phaseForm.controls['dateFinReelle'].value
    let dateDp = this.phaseForm.controls['dateDebutReelle'].value
    
    if(dateFp && dateDp){
      if(dateFp >= dateDp){ 
        let diffc = dateFp.getTime() - dateDp.getTime();
        let duree = Math.round(Math.abs(diffc/(1000*60*60*24)));
      this.phaseForm.controls['dureeReelle'].setValue(duree)
      
      }
       
    }
    
    
   }
  onSubmit(){
    const formValues = this.phaseForm.value
    const controls = this.phaseForm.controls;
    /** check form */
 	if (this.phaseForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    this.loading = true;
      const phase: any = Object.assign({}, formValues);
     
 
   this.service.savePhase(phase)
    .subscribe(data =>{
              console.log(data)
              this.router.navigate(['projet/projet-show/'] , { queryParams: { id: this.id } })
             
              
               },
              error => console.log(error)
            );    
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
		const control = this.phaseForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
  }
  
 

}
