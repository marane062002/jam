import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PersonnelService } from '../../services/personnel.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-conge-edit',
  templateUrl: './conge-edit.component.html',
  styleUrls: ['./conge-edit.component.scss']
})
export class CongeEditComponent implements OnInit {

  submitted = false;
  demandeForm: FormGroup; 
  id:number;
  types:any; 
  joursF:any;
  demande:any;   
  personnelId:any;
  typeId:any;  
  droits = 0;   
  reste = 0;   
  consome = 0;     
                     
                     
  constructor( private service:PersonnelService,
    private datepipe:DatePipe,
    private router: Router,
    private fb:FormBuilder,
    private route: ActivatedRoute
   
    
  ) {  
    this.id = this.route.snapshot.params['id'];
    this.getDate();
    
   
    
  }

  ngOnInit() {
    this.demandeForm =this.fb.group({         
       id:[null],
      type:[null],
      dateDemande:[null],
      dateDebut:[null],
      dateFin:[null],
      duree:[null],   
      statut:[null],    
      personnel:[null]
      })
   
      
  }
 
  getDate(){
    this.service.getRessourceById(this.id,'/demandeConges/show/')
    .then( data => {
      this.personnelId = data.personnel.id
      this.getTypes(this.personnelId);
      this.demandeForm.patchValue(data);
      this.demandeForm.get('dateDebut').patchValue(new Date(data.dateDebut).toISOString())
      let dateFin = this.datepipe.transform(data.dateFin,'yyyy-MM-dd');
      this.demandeForm.get('dateFin').patchValue(dateFin)
      this.getRestConge()})

    this.service.getRessource()
    .then(data => this.joursF = data);
  }
  onSubmit(formValues){

    this.demande = Object.assign({}, formValues);
 
    console.log( this.demande);
 
   this.service.postRessource(this.demande,"/demandeConges/new")
    .subscribe(data => {console.log(data),this.gotoList()} ,
              error => console.log(error)
            );
    
  
  }
  compare(val1, val2) {
    if(val1 && val2)
    return val1.id === val2.id;

  }
  getTypes(id){
    
    this.service.getRessourceById(id,'/typesConge/personnels/')
    .then(data => this.types = data);

  }
  getRestConge(){
    /* 
    
    if(this.demandeForm.controls['type'].value){ 
      let id = this.demandeForm.controls['type'].value.id;
     
    this.typeId = id;
    this.service.getRessourceByIds(this.personnelId,this.typeId,'/resteConge?id=')
    .subscribe(data => {this.droits=data.droits,
                        this.consome = data.consome,
                        this.reste = data.reste
          });
          this.demandeForm.controls['duree'].enable()
        }
    else{
       this.droits=0,
       this.consome = 0,
      this.reste = 0,
      this.demandeForm.controls['duree'].disable()
    } */
  }

  dureeChange(){
    if(this.demandeForm.controls['duree'].value > 0){
      this.demandeForm.controls['dateDebut'].enable()
      
       
    }
    else{
      this.demandeForm.controls['dateDebut'].disable()
      this.demandeForm.controls['dateDebut'].setValue(null)
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



}
