import { Component, OnInit } from '@angular/core';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../environments/environment';

@Component({ 
  selector: 'kt-ligneloyer-show',
  templateUrl: './ligneloyer-show.component.html',
  styleUrls: ['./ligneloyer-show.component.scss']
})
export class LigneloyerShowComponent implements OnInit {

 
  loading = false;
  id:number;
  pjs:any;
  ligneloyer:any;
  docs = [{'type':'DEC','libelle':'قرار'},{'type':'ACT','libelle':'عقد إجار'},{'type':'REC','libelle':'إصال الأداء'},{'type':'DOC','libelle':'وثيقة'}];
  constructor(private service:BienscommunalService,
   
    private router: Router,private route: ActivatedRoute) { 
      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
      }); 

      this.getLigneLoyer(this.id)
    }

  ngOnInit() {
   
   
  }
  getLigneLoyer(id){
    this.service.getDataLigneLoyerToilette(id)
    .then(data => {
     
      this.ligneloyer = data[0]
      
      this.pjs = data[1]
      
     
           
          
          
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
  
  update(){
   // this.router.navigate(['/attestation/attestation-edit'], { queryParams: { id: this.id} })
  }

  findLibelleType(type){
    const resultat = this.docs.find( doc => doc.type === type);
    return resultat
  }
  onClickPjName(e,id) {
		//console.log('You clicked: '+e) ;
		var r=e.substring(0,e.length-4); 
    
 
    window.open(environment.API_ALFRESCO_URL +'/PjLignesLoyerToilette/'+r);
    
    
	  }
 

    back(id){
      this.router.navigate(['/toilette/loyer-show'], { queryParams: { id: id } })
    }

}
