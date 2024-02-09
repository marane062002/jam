import { Component, OnInit } from '@angular/core';
import { PersonnelService } from '../../services/personnel.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-conge-show',
  templateUrl: './conge-show.component.html',
  styleUrls: ['./conge-show.component.scss']
})
export class CongeShowComponent implements OnInit {

  id:number;
  isloading = false;
  demande:any;
  conge:any;
  constructor(private service:PersonnelService,
    private router: Router,private route: ActivatedRoute) { 
      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
      });

      this.getDemande()
    }

  ngOnInit() {

  }

  getDemande(){
    
     this.service.getDemandeCongeById(this.id)
      .then(data => {this.demande = data;
       
        this.service.getInfosCongeByPersonnel(data.personnel.id,data.type.id)
              .then(resp => {
              
                this.conge = resp;
              }, error => console.log(error));


        
        
      }, error => console.log(error));
    

  }

  public delete(id: number) {
   /*  this.serviceAttestation.deleteRessource(id,'/demandes/delete/')
      .subscribe(
        data => {
          console.log(data),
          this.router.navigate(['attestation/attestation-index']) 
          
        },
        error => console.log(error)); */
  }
  cancel(){
    this.isloading = true
    this.service.cancelDemandeConge(this.demande,this.id)
    .subscribe(data => {
      this.router.navigate(['conge/conge-index']);
      
    }, error => console.log(error));
  }

  validate(){
    this.router.navigate(['/conge/conge-validate'], { queryParams: { id: this.id} })
  }
  update(){
    //this.router.navigate(['/attestation/attestation-edit'], { queryParams: { id: this.id} })
  }
}
