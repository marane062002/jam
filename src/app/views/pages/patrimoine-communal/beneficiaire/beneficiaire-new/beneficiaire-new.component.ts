import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BienscommunalService } from '../../services/bienscommunal.service';

@Component({
  selector: 'kt-beneficiaire-new',
  templateUrl: './beneficiaire-new.component.html',
  styleUrls: ['./beneficiaire-new.component.scss']
})
export class BeneficiaireNewComponent implements OnInit {

  loading = false;
  beneficiaireForm: FormGroup; 

  constructor(private service:BienscommunalService,  
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb:FormBuilder) {

     }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];
    console.log(id)
    this.beneficiaireForm = this.fb.group({      
       
      nom: ['', Validators.compose([
              Validators.required,
                  ])
                  ],
      prenom:['', Validators.required],
      cin:[null, Validators.required],
      beneficiaire:[null],	
      adresse:[null],	
      observation:[null],	
      
     	
      })
  }

  get f() { return this.beneficiaireForm?this.beneficiaireForm.controls:null; }

  onSubmit(){
   
    const formValues = this.beneficiaireForm.value
    const controls = this.beneficiaireForm.controls;
    /** check form */
 	if (this.beneficiaireForm.invalid) {
    
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    this.loading = true;
      const beneficiaire: any = Object.assign({}, formValues);
     console.log(beneficiaire)
 
   this.service.saveBeneficiaire(beneficiaire)
    .subscribe(data =>{
      this.router.navigate(['beneficiaire/beneficiaire-index/'])   
    },error => console.log(error)
            );    
  }

  back(){
    this.router.navigate(['beneficiaire/beneficiaire-index']);
  }

   /**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.beneficiaireForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
  }


}
