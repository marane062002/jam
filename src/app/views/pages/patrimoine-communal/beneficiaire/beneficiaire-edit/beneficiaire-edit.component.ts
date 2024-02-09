import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BienscommunalService } from '../../services/bienscommunal.service';

@Component({
  selector: 'kt-beneficiaire-edit',
  templateUrl: './beneficiaire-edit.component.html',
  styleUrls: ['./beneficiaire-edit.component.scss']
})
export class BeneficiaireEditComponent implements OnInit {

  loading = false;
  beneficiaireForm: FormGroup;
  id:number;   
  

  constructor(
    private service:BienscommunalService,
    private router: Router,
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private location:Location
  ) { 

    this.route.queryParams.subscribe(params => {
      this.id= params['id'];
    });

    console.log('ID: ' + this.id);
    this.beneficiaireForm = this.fb.group({      
      id: [this.id],
      nom: ['', Validators.required],
      prenom:['', Validators.required],
      cin:[null, Validators.required],
      adresse:[null],	
      observation:[null],	
    })

    this.service.getBeneficiaireById(this.id).subscribe(data =>{
  //    console.log('data :' +JSON.stringify(data,null,4));
     this.beneficiaireForm.patchValue(data[0]);
    })
  }

  ngOnInit() {

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
 
   this.service.updateBeneficiaire(beneficiaire,this.id)
    .subscribe(data =>{
      this.router.navigate(['beneficiaire/beneficiaire-index/'])   
    },error => console.log(error)
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
		const control = this.beneficiaireForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
  }


}
