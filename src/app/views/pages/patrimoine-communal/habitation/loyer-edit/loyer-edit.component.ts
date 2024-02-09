import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BienscommunalService } from '../../services/bienscommunal.service';

@Component({
  selector: 'kt-loyer-edit',
  templateUrl: './loyer-edit.component.html',
  styleUrls: ['./loyer-edit.component.scss']
})
export class LoyerEditComponent implements OnInit {
  loading = false;
  loyerForm: FormGroup;   
  id:number;
  idParent:number;
  duree:number;
  locataires:any;
  addActeForm: FormGroup; 
  public uploadActeFiles: Array<File>; 
  annees =Array();
  mois = [{'id':0,'libelle':'يناير'},{'id':1,'libelle':'فبراير'},{'id':2,'libelle':'مارس'},{'id':3,'libelle':'أبريل'},{'id':4,'libelle':'ماي'},{'id':5,'libelle':'يونيو'},{'id':6,'libelle':'يوليوز'},{'id':7,'libelle':'غشت'},{'id':8,'libelle':'شتنبر'},{'id':9,'libelle':'أكتوبر'},{'id':10,'libelle':'نونبر'},{'id':11,'libelle':'دجنبر'}];
  dateSys = new Date();
 
   
 
  constructor(private service:BienscommunalService,
    private locale:Location,
    private router: Router,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    
  ) {  
    for(let i = 1950; i <= 2200; i++) this.annees.push(i);
   
    this.route.queryParams.subscribe(params => {
      this.id= params['id'];
      this.idParent=params['idParent'];
  })
  
    this.getLocataires();
    
  }

  

  ngOnInit() {
    
    this.loyerForm = this.fb.group({      
       
      numActeLocation: ['', Validators.compose([
              Validators.required,
                  ])
                  ],
      observation:[null],
      dateActe:[null],
      montantLoyer:[0,Validators.required],
      montantImpaye:[0],
      anneeDebut:[null,Validators.required],
      moisDebut:[null,Validators.required],
      anneeEnCours:[null],
      moisEnCours:[null],
      locataire:['',Validators.required],
      appartement:[{id:this.id}],
      ligneloyers: new FormArray([])	
      })
      this.addActeForm = this.fb.group({
        _file: []
      });

      this.service.getLoyersByAppartement(this.id)
      .then(data =>{
        console.log('data :'+JSON.stringify(data,null,4))
        this.loyerForm.patchValue(data)
        this.loyerForm.get('dateActe').patchValue(new Date(data.dateActe).toISOString())
      })
  }
    get f() { return this.loyerForm?this.loyerForm.controls:null; }
    get m() { return this.f?this.f.ligneloyers as FormArray:null; }
   
    getLocataires(){
      this.service.getLocataires()
      .then(data => this.locataires = data)
      
    }
  
    
  
  onSubmit(){
    
  this.getLignesLoyer()
    const formValues = this.loyerForm.value
    const controls = this.loyerForm.controls;
    
 	if (this.loyerForm.invalid) {
    
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    this.loading = true;
      const loyer: any = Object.assign({}, formValues);
    
 
//   this.service.saveLoyerAppt(loyer)
    this.service.updateLoyerAppt(loyer,this.id)
    .subscribe(data =>{
          let m:any=Object.assign({}, data);
          console.log(m.id) 
           if(this.uploadActeFiles)
              this.service.updloadFile(this.uploadActeFiles, m.id,'/PjLoyerApptActes/multiplefile')
              .subscribe(resp=>{console.log(resp)},
              error => console.log(error)) 
              this.router.navigate(['habitation/appartement-show/'], { queryParams: { id: loyer.appartement.id } }) 
 //             this.router.navigate(['habitation/appartement-show/'], { queryParams: { id: this.idParent } }) 
              
               },
              error => console.log(error)
            );    
  }

  getLignesLoyer(){
    const anneeD = this.loyerForm.controls['anneeDebut'].value
    const moisD = this.loyerForm.controls['moisDebut'].value
    const anneeS = this.dateSys.getFullYear()
    const moisS = this.dateSys.getMonth()
    const montantLoyer = this.loyerForm.controls['montantLoyer'].value
    this.duree = (anneeS - anneeD)*12 + moisS - moisD 
     if(this.duree > 0 ){
        
        this.loyerForm.controls['montantImpaye'].setValue(this.duree * montantLoyer)
        this.loyerForm.controls['anneeEnCours'].setValue(anneeS)
        this.loyerForm.controls['moisEnCours'].setValue(moisS)
        this. ajouterLignes(this.duree,moisD,anneeD) 
     }     
      
        

  
  }

  ajouterLignes(nb,m,annee) {
    
    for (let i = nb; i > 0; i--) {
      if(m==12) {m = 0; annee++}
      //console.log(this.mois[m].libelle +' '+ annee) 
      
    this.m.push(this.fb.group({
      anneeLoyer: [annee],
      moisLoyer: [m],
      etatReglement: ['false'],
     
           
    }));
    m++
  }
}
back(){
  //this.router.navigate(['/habitation/appartement-show'], { queryParams: { id: this.id } })
  this.locale.back()
}

  /**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loyerForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
  }
  
   // ============================================
	// Upload file event
	// ============================================
	fileChange(event) {
		this.uploadActeFiles = event.target.files;
		console.log(this.uploadActeFiles)
		if (event.target.files.length > 0) {
			console.log("target : " + event.target.files.length);
			const file = event.target.files[0];
			this.addActeForm.patchValue(this.uploadActeFiles);
		
		} 

  }

}
