import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PersonnelService } from '../../services/personnel.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-conge-validate',
  templateUrl: './conge-validate.component.html',
  styleUrls: ['./conge-validate.component.scss']
})
export class CongeValidateComponent implements OnInit {

  id:number;
  isloading = false;
  demande:any;
  statuts:any;
  conge:any;
  personnel:any;
  validateForm: FormGroup; 
  
  constructor(
    private personnelService:PersonnelService,
    private formBuilder:FormBuilder,
    private router: Router,private route: ActivatedRoute) { 
      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
      });
      this.getData(this.id);
     
    }

  ngOnInit() {
   
    this.validateForm=this.formBuilder.group({
      id:[null],
      type:[null],
      dateDemande:[null], 
      dateDebut:[null],
      dateFin:[null],
      duree:[0],       
      personnel:[null],
     
      statut:[null],
     
      })
   
     
  
    
    
   
    

  }
 getData(id){
  this.personnelService.getDataValidateConge(id)
  .then(data => {
    this.demande = data[0] ;
    
    this.personnelService.getInfosCongeByPersonnel(this.demande.personnel.id,this.demande.type.id)
    .then(resp => {
    
      this.conge = resp;
    }, error => console.log(error));

    this.statuts =data[1];
    this.validateForm.patchValue(this.demande)
   
    
  }, err => {
    console.log(err);
    
  }
  );

 }
  

  compare(val1, val2) {
    
    if(val1 && val2)
    return val1.id === val2.id;

  }

  onSubmit(){
    const formValues = this.validateForm.value
        const demande: any = Object.assign({}, formValues);
        
     
        this.isloading = true
     
       this.personnelService.validateDemandeConge(demande,this.id)
        .subscribe(data =>{ 
          
          this.router.navigate(['conge/conge-index'])},
         
               
   error => console.log(error)
);
  }

  public delete(id: number) {
    this.personnelService.deleteRessource(id,'/demandeConges/delete/')
      .subscribe(
        data => {
          console.log(data),
          this.router.navigate(['conge/conge-index']) 
          
        },
        error => console.log(error));
  }
  cancel(){
    this.isloading = true
    this.personnelService.cancelDemandeConge(this.demande,this.id)
    .subscribe(data => {
      this.router.navigate(['conge/conge-index']);
      
    }, error => console.log(error));
  }

  validate(){
    this.router.navigate(['/conge/conge-validate'], { queryParams: { id: this.id} })
  }
  update(){
    this.router.navigate(['/conge/conge-edit'], { queryParams: { id: this.id} })
  }

}
