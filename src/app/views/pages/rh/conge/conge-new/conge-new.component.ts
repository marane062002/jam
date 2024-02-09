import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PersonnelService } from '../../services/personnel.service';
import { DatePipe, registerLocaleData } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User, currentUser } from '../../../../../core/auth';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';
import localeAr from '@angular/common/locales/ar-MA';

registerLocaleData(localeAr, 'ar');
@Component({
  selector: 'kt-conge-new',
  templateUrl: './conge-new.component.html',
  styleUrls: ['./conge-new.component.scss']
})
export class CongeNewComponent implements OnInit {

  isloading = false;
    demandeForm: FormGroup; 
    
    user$: Observable<User>;
    
    types:any; 
    joursF:any;
    demande:any;   
    
    personnel:any
    droits = 0;   
    reste =  new FormControl(0); 
    consome = 0;     
                       
                       
    constructor( private personnelService:PersonnelService,
      
      private datepipe:DatePipe,
      private store: Store<AppState>,
      private router: Router,
      private fb:FormBuilder
      
    ) {  
      this.getPersonnelId()
      
      
    }
  
    ngOnInit() {
      this.initForm()
     
        
    }
    initForm(){
      this.demandeForm =this.fb.group({         
         
        type:[null,Validators.required],
        
        dateDebut:{value: new Date(), disabled: true},
        dateFin:{value:null},
        duree:{value: 0, disabled: true},       
        personnel:[]
        })
    }
    public getPersonnelId(){
      this.user$ = this.store.pipe(select(currentUser));
      
      this.user$.subscribe(user =>{
        if(user){ 
        this.getPersonnel(user.idPersonnel)     
       
        this.getDataConge(user.idPersonnel)
        }
      })
      }
      async getPersonnel(id){
        await this.personnelService.getCongePersonnelById(id)
        .subscribe(data => {
         
         this.personnel =data[0]})
        
      }
    
    onSubmit(){ 
  
     const controls = this.demandeForm.controls; 
      /** check form */
      if (this.demandeForm.invalid) {
        Object.keys(controls).forEach(controlName =>
          controls[controlName].markAsTouched()
        );
        return;
      }
      this.isloading = true;    
       this.demandeForm.get('personnel').setValue(this.personnel)
        const demande = Object.assign({}, this.demandeForm.value);

        console.log(demande)
   
     this.personnelService.postRessource(demande,"/demandeConges/new")
      .subscribe(data => {console.log(data),this.gotoList()} ,
                error => console.log(error)
              ); 
      
    
    }
  
    async getDataConge(id){
      await this.personnelService.getDataConge(id)
   // .pipe(delay(1000))
    .subscribe(data => {
      this.types = data[0]; 
      
      this.joursF = data[1];

    

    }, err => {
     // this.notLoading = false;
      console.log(err);
      
    }
    );
    
   
    }
    getRestConge(){
      
      let idPersonnel = this.personnel.id
      if(this.demandeForm.controls['type'].value){ 
        let typeId = this.demandeForm.controls['type'].value.id;
       
             this.getInfTypeConge_Personnel(idPersonnel,typeId)
            this.demandeForm.controls['duree'].enable()
            this.etatInit()
          }
      else{
        this.etatInit()
      }
    }
    async getInfTypeConge_Personnel(idP,idT){
      await this.personnelService.getInfTypeConge(idP,idT)
      .subscribe(data => {this.droits=data[0].droits,
                          this.consome = data[0].consome,
                          this.reste.setValue(data[0].reste ) 
            });
    }
    dureeChange(){
      if(this.demandeForm.controls['duree'].value > 0){
        this.demandeForm.controls['dateDebut'].enable()
        this.demandeForm.controls['dateDebut'].setValue(new Date())
        this.checkDuree()
         
      }
      else{
        this.etatInit()
      }
      this.dateDchange()
    }
    dateDchange(){
      if(this.demandeForm.controls['dateDebut'].value)
        this.getDateFin()
      else
      this.demandeForm.controls['dateFin'].setValue(null)
        
    }
    
    getDateFin(){
      
       
      let duree = this.demandeForm.get('duree').value;
      let dateDebut = new Date(this.demandeForm.get('dateDebut').value);
      
      while(duree > 0){
         
        dateDebut.setDate(dateDebut.getDate() + 1);
        
        let day = dateDebut.getDay();
        let ifJf = false;
        for(let jF of this.joursF){
           if(dateDebut >= new Date(jF.dateDebut) && dateDebut <= new Date(jF.dateFin))
               ifJf = true;
        }
        if(!ifJf)
          if(day !=0 && day !=1)        
            duree--;

      }
     const dateFin = this.datepipe.transform(dateDebut,'yyyy-MM-dd');
      
      this.demandeForm.controls['dateFin'].setValue(dateFin)
    
    }
  
    
    gotoList() {
      this.router.navigate(['conge/conge-index']);
    }
    
    checkDuree(){
      let duree = this.demandeForm.get('duree').value
      let reste = this.reste.value

      if(duree > reste)
      { alert("duree superieur au reste conge")
     
      this.etatAvDureeChange()
     }
     
      
    }
    etatAvDureeChange(){
      
      this.demandeForm.get('duree').setValue(0)
      this.demandeForm.controls['dateDebut'].disable()
      this.demandeForm.controls['dateDebut'].setValue(null)
      this.demandeForm.controls['dateFin'].setValue(null)
    }
  
    etatInit(){
      this.droits=0,
      this.consome = 0,
      this.reste.setValue(0) 
      this.demandeForm.get('duree').setValue(0)
      this.demandeForm.controls['dateDebut'].disable()
      this.demandeForm.controls['dateDebut'].setValue(null)
      this.demandeForm.controls['dateFin'].setValue(null)
    }
    /**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.demandeForm?this.demandeForm.controls[controlName]:null;
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}


}
