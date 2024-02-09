import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatrimoineService } from '../../services/patrimoine.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'kt-mvmtransaction-edit',
  templateUrl: './mvmtransaction-edit.component.html',
  styleUrls: ['./mvmtransaction-edit.component.scss']
})
export class MvmtransactionEditComponent implements OnInit {

  loading = false;
  mvmtForm: FormGroup;    
  id:number;
  idParent:number;
  types:any;

   
 
  constructor(private service:PatrimoineService,
    
    private router: Router,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private location:Location,
    
  ) {  
    this.route.queryParams.subscribe(params => {
      this.id= params['id'];
      this.idParent = params['idParent'];
  })
 
   
  }

  

  ngOnInit() {
    
    this.mvmtForm = this.fb.group({      
       
      numMouvement: ['',Validators.required,   
                  ],
      dateMouvement:['',Validators.required],
      prixTransaction: [null],
      benificiaireTransaction:[null],
      notaireNom : [null],
      notairePrenom : [null],
      remarque:[null], 
      patrimoine:[{id:this.id}],
      
      })


      this.service.getMvmTById(this.id)
      .subscribe(data =>{
        console.log('data :'+JSON.stringify(data[0],null,4))
          this.mvmtForm.patchValue(data[0])
 //         this.mvmtForm.patchValue(data[0].type)
          this.mvmtForm.get('dateMouvement').patchValue(new Date(data[0].dateMouvement).toISOString())
  //        this.toiletteForm.get('dateFinExploitation').patchValue(new Date(data.dateFinExploitation).toISOString());

      })
     
      // this.getTypes();

  }
    get f() { return this.mvmtForm?this.mvmtForm.controls:null; }
   
  // getTypes(){
  //   this.service.getTypeTs().subscribe(data => this.types = data )
  // }
  
  
  onSubmit(){
    const formValues = this.mvmtForm.value
    const controls = this.mvmtForm.controls;
    /** check form */
 	if (this.mvmtForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    this.loading = true;
      const mvmt: any = Object.assign({}, formValues);
     
      this.service.updateMvmT(mvmt,this.id)
    .subscribe(data =>{
              
      this.router.navigate(['/patrimoine/patrimoine-show'], { queryParams: { id: this.idParent } })
              
               },
              error => console.log(error)
            ); 
            
  }

  back(){
    this.location.back();
   }

  

  

  /**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.mvmtForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
  }
}
