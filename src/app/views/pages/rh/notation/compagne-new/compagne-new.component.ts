import { Component, OnInit } from '@angular/core';
import { OrganisationService } from '../../../organisation/organisation.service';
import { NotationService } from '../../services/notation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-compagne-new',
  templateUrl: './compagne-new.component.html',
  styleUrls: ['./compagne-new.component.scss']
})
export class CompagneNewComponent implements OnInit {

  loading = false;
  compagneForm: FormGroup; 
  divisions:any;
  services:any;  
  compagne:any;                 
  
  annees =Array();
  mois = ['يناير','فبراير','مارس','أبريل','ماي','يونيو','يوليوز','غشت','شتنبر','أكتوبر','نونبر','دجنبر'];

   
                     
  constructor(private service:NotationService,
   
    private router: Router,
    private formBuilder:FormBuilder
    
  ) {  
    for(let i = 1990; i <= 2100; i++) this.annees.push(i);

    
  }

  
  
  
  ngOnInit() {
    this.compagneForm=this.formBuilder.group({
      libelle:[null, Validators.required],
      anneeNotation:['', Validators.required],      		   
      moisDebut:[null],  
      moisFin:[null],
     
      })
   
      
  }

  
  onSubmit(){
   
    const controls = this.compagneForm.controls;
    /** check form */
		if (this.compagneForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    this.loading = true;
   this.service.postRessource(Object.assign({}, this.compagneForm.value),"/compagneNotations/new")
    .subscribe(data => {console.log(data), this.gotoList()},
              error => console.log(error)
            );
    
    
  }

  
  

  
  gotoList() {
    this.router.navigate(['notation/compagne-index']);
  }

  /**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.compagneForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

}
