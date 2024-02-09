import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'kt-ligneloyer-new',
  templateUrl: './ligneloyer-new.component.html',
  styleUrls: ['./ligneloyer-new.component.scss']
})
export class LigneloyerNewComponent implements OnInit {

  loading = false;
  lloyerForm: FormGroup;   
  id:number; 
  montantLoyer:number;
  loyer:any;
  annees =Array();
  mois = ['يناير','فبراير','مارس','أبريل','ماي','يونيو','يوليوز','غشت','شتنبر','أكتوبر','نونبر','دجنبر'];
   
 
  constructor(private service:BienscommunalService,
    private location:Location,
    private router: Router,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    
    
  ) {  
    for(let i = 1990; i <= 2100; i++) this.annees.push(i);
    this.id = this.route.snapshot.params['id'];
    this.getLoyer();
    
    
  }

  

  ngOnInit() {
    
    this.lloyerForm = this.fb.group({      
       
      anneeLoyer: ['', Validators.compose([
              Validators.required,
                  ])
                  ],
      observation:[null],
      moisLoyer:[null,Validators.required],
      etatReglement:['false'],
      numRecu:{value: null, disabled: true},
      datePaiement:{value: null, disabled: true},
      loyer:[null]
      
      
       

     	
      })
     
  }
    get f() { return this.lloyerForm?this.lloyerForm.controls:null; }
    getLoyer(){
      this.service.getLoyerById(this.id)
      .then(data => {this.montantLoyer=data.montantLoyer,
        console.log(data)
        this.loyer = data
         this.lloyerForm.controls['loyer'].patchValue(data)})
      
    }
   
  
    
  
  onSubmit(){
   
    const formValues = this.lloyerForm.value
    const controls = this.lloyerForm.controls;
    /** check form */
 	if (this.lloyerForm.invalid) {
    
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    this.loading = true;
      const lloyer: any = Object.assign({}, formValues);
    console.log(lloyer)
    
   this.service.saveLigneLoyer(lloyer)
    .subscribe(data =>{
              console.log(data)
              this.router.navigate(['marche/loyer-show/'+this.id]) 
             
              
               },
              error => console.log(error)
            );    
  }

  etatChange(){
    const etat = this.lloyerForm.controls['etatReglement'].value;
    if(etat == 'true'){
      this.lloyerForm.controls['datePaiement'].enable();
      this.lloyerForm.controls['numRecu'].enable();
    }
    else{
      this.lloyerForm.controls['datePaiement'].setValue(null);
      this.lloyerForm.controls['numRecu'].setValue(null);
      this.lloyerForm.controls['datePaiement'].disable();
      this.lloyerForm.controls['numRecu'].disable();
    }
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
		const control = this.lloyerForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
  }
  


}
