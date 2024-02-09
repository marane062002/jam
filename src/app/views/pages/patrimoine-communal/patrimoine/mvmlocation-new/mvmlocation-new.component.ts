import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatrimoineService } from '../../services/patrimoine.service';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'kt-mvmlocation-new',
  templateUrl: './mvmlocation-new.component.html',
  styleUrls: ['./mvmlocation-new.component.scss']
})
export class MvmlocationNewComponent implements OnInit {

  loading = false;
  mvmlForm: FormGroup;    
  id:number;
  locataires:any;
  dateErr= false;

   
 
  constructor(private service:PatrimoineService,
    private location:Location,
    private router: Router,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    
  ) {  
    this.route.queryParams.subscribe(params => {
      this.id= params['id'];
  })
    
  }

  

  ngOnInit() {
    
    this.mvmlForm = this.fb.group({      

      dateDebutActe:[null],
      dateFinActe:[null],
      datePaiement:[null],   
      montantLouer:[null],	
      dureeActe:[null],	
      patrimoine:[{id:this.id}],
      idLocataire:[null]
      
      })

      this.getData()
     
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
     
 
   this.service.saveMvmL(mvml)
    .subscribe(data =>{
      this.router.navigate(['/patrimoine/patrimoine-show'], { queryParams: { id: this.id } })
             
              
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
       
       let diffc = dateFA.getTime() - dateDA.getTime();
      let duree = Math.round(Math.abs(diffc/(1000*60*60*24)));
      this.mvmlForm.controls['dureeActe'].setValue(duree)
      
      }else
       this.dateErr = true
       
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
