import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatrimoineService } from '../../services/patrimoine.service';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'kt-mvmlocation-edit',
  templateUrl: './mvmlocation-edit.component.html',
  styleUrls: ['./mvmlocation-edit.component.scss']
})
export class MvmlocationEditComponent implements OnInit {
  
  loading = false;
  mvmlForm: FormGroup;    
  id:number;
  idParent:number;
  locataires:any;
  dateErr= false;
 
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
    this.getData()
    this.mvmlForm = this.fb.group({      
      id: [this.id],
      dateDebutActe:[null],
      dateFinActe:[null],
      datePaiement:[null],   
      montantLouer:[''],	
      dureeActe:[null],
      patrimoine:[{id:this.id}],
      idLocataire:this.fb.group({ id : []}),      
      
      })

      this.service.getMvmLById(this.id)
      .subscribe(data =>{
        console.log('data :'+JSON.stringify(data[0],null,4))
        this.mvmlForm.patchValue(data[0])
        this.mvmlForm.get('dateDebutActe').patchValue(new Date(data[0].dateDebutActe).toISOString())
        this.mvmlForm.get('dateFinActe').patchValue(new Date(data[0].dateFinActe).toISOString())
        this.mvmlForm.get('datePaiement').patchValue(new Date(data[0].datePaiement).toISOString())
       })
     
  }
    get f() { return this.mvmlForm?this.mvmlForm.controls:null; }
   
  
  onSubmit(){
    const formValues = this.mvmlForm.value
    const controls = this.mvmlForm.controls;
    /** check form */
 	if (this.mvmlForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    this.loading = true;
      const mvml: any = Object.assign({}, formValues);
     
      this.service.updateMvmL(mvml,this.id)
    .subscribe(data =>{
              console.log(this.idParent)
      this.router.navigate(['/patrimoine/patrimoine-show'], { queryParams: { id: this.idParent } })
              
               },
              error => console.log(error)
            ); 
 
  }

  getData(){
    this.service.getDataMVML().then( data =>{
      this.locataires=data[0];
      console.log(this.locataires)
    },err =>{ 
      console.log(err)
    })

  }

  dateActeChng(){
    let dateFA = this.mvmlForm.controls['dateFinActe'].value
    let dateDA = this.mvmlForm.controls['dateDebutActe'].value
    if(dateFA && dateDA){
      if(dateFA >= dateDA){ 
        let diff = dateFA.getTime() - dateDA.getTime();
        let duree = Math.round(Math.abs(diff/(1000*60*60*24*365.25)));
      this.mvmlForm.controls['dureeActe'].setValue(duree)    
      }else
       this.dateErr=true    
    }
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
		const control = this.mvmlForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
  }

}
