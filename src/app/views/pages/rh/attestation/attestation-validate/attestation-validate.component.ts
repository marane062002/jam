import { Component, OnInit } from '@angular/core';
import { AttestationService } from '../../services/attestation.service';
import { Router, ActivatedRoute } from '@angular/router';
import {  FormGroup, FormBuilder } from '@angular/forms';

import { PersonnelService } from '../../services/personnel.service';

@Component({
  selector: 'kt-attestation-validate',
  templateUrl: './attestation-validate.component.html',
  styleUrls: ['./attestation-validate.component.scss']
})
export class AttestationValidateComponent implements OnInit {

  isloading = false; 
  id:number;
  demande:any;
  statuts:any;
  personnel:any;
  validateForm: FormGroup; 
  
  constructor(private serviceAttestation:AttestationService,
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
      note:[null],   
      idPersonnel:[],
     
      statut:[null],
     
      })
   
     
  
    
    
   
    

  }
 getData(id){
  this.serviceAttestation.getDataValidate(id)
  .then(data => {
     
    this.demande = data[0];
    this.statuts =data[1];
    this.validateForm.patchValue(this.demande)
    this.personnelService.getPersonnelById(this.demande.idPersonnel)
    .then(p=> {this.personnel = p
     
    })
    
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

    this.isloading = true;
        const demande: any = Object.assign({}, formValues);
        
       this.serviceAttestation.validateDemande(demande,this.id)
        .subscribe(data =>{ 
          
          this.router.navigate(['attestation/attestation-index'])},
         
               
   error => console.log(error)
);
  }

  public delete(id: number) {
    this.serviceAttestation.deleteRessource(id,'/demandes/delete/')
      .subscribe(
        data => {
          console.log(data),
          this.router.navigate(['attestation/attestation-index']) 
          
        },
        error => console.log(error));
  }
  cancel(){
    this.isloading = true
    this.serviceAttestation.cancelDemande(this.demande,this.id)
    .subscribe(data => {
      this.router.navigate(['attestation/attestation-index']);
      
    }, error => console.log(error));
  }

  validate(){
    this.router.navigate(['/attestation/attestation-validate'], { queryParams: { id: this.id} })
  }
  update(){
    this.router.navigate(['/attestation/attestation-edit'], { queryParams: { id: this.id} })
  }
 

}
