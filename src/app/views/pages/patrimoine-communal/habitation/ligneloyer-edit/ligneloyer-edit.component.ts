import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'kt-ligneloyer-edit',
  templateUrl: './ligneloyer-edit.component.html',
  styleUrls: ['./ligneloyer-edit.component.scss']
})
export class LigneloyerEditComponent implements OnInit {
  
  loading = false;
  lloyerForm: FormGroup;   
  id:number; 
  idloyer:number;
  montantLoyer:number;
  ligneLoyer:any;
 
  mois = [{'id':0,'libelle':'يناير'},{'id':1,'libelle':'فبراير'},{'id':2,'libelle':'مارس'},{'id':3,'libelle':'أبريل'},{'id':4,'libelle':'ماي'},{'id':5,'libelle':'يونيو'},{'id':6,'libelle':'يوليوز'},{'id':7,'libelle':'غشت'},{'id':8,'libelle':'شتنبر'},{'id':9,'libelle':'أكتوبر'},{'id':10,'libelle':'نونبر'},{'id':11,'libelle':'دجنبر'}];
   
 
  constructor(private service:BienscommunalService,
    private location:Location,
    private router: Router,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    
  ) {  
    
    this.route.queryParams.subscribe(params => {
      this.id= params['id'];
    });
    this.getLloyer(this.id);
    
    
    
  }

  

  ngOnInit() {
    
    this.lloyerForm = this.fb.group({      
       id:[null],
      anneeLoyer: ['', Validators.compose([
              Validators.required,
                  ])
                  ],
      observation:[null],
      moisLoyer:[null,Validators.required],
      etatReglement:['false'],
      numRecu:[null],
      datePaiement:[null],
      loyer:[null]
      
      
       

     	
      })
     
  }
    get f() { return this.lloyerForm?this.lloyerForm.controls:null; }
    getLloyer(id){
      this.service.getLigneLoyerApptById(this.id)
      .subscribe(data => {
        this.ligneLoyer=data
       
        this.idloyer = data.loyer.id,
        
        this.lloyerForm.patchValue(data)

        if(data.datePaiement)
        this.lloyerForm.get('datePaiement').patchValue(new Date(data.datePaiement).toISOString())
        this.etatInit(data.etatReglement)
      })
        
    }
   

    etatChange(){
      
      const etat = this.lloyerForm.controls['etatReglement'].value
      
      if(etat == 'true'){
        this.lloyerForm.controls['datePaiement'].enable();
        this.lloyerForm.controls['numRecu'].enable();
      }
      else{
       
        this.lloyerForm.controls['datePaiement'].patchValue(null);
       
        this.lloyerForm.controls['numRecu'].patchValue(null);
        this.lloyerForm.controls['datePaiement'].disable();
        this.lloyerForm.controls['numRecu'].disable();
      }
   
    } 
    etatInit(etat){
      
      
      if(etat == 'true'){
        this.lloyerForm.controls['datePaiement'].enable();
        this.lloyerForm.controls['numRecu'].enable();
      }
      else{
       
        this.lloyerForm.controls['datePaiement'].patchValue(null);
       
        this.lloyerForm.controls['numRecu'].patchValue(null);
        this.lloyerForm.controls['datePaiement'].disable();
        this.lloyerForm.controls['numRecu'].disable();
      }
   
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
    
 
   this.service.updateLigneLoyerAppt(lloyer,this.id)
    .subscribe(data =>{
              console.log(data)
              this.router.navigate(['habitation/loyer-show/'], { queryParams: { id: lloyer.loyer.id } }) 
             
              
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
		const control = this.lloyerForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
  }
  

}
