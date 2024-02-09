import { Component, OnInit } from '@angular/core';
import { PresenceService } from '../../services/presence.service';
import { PersonnelService } from '../../services/personnel.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-presence-show',
  templateUrl: './presence-show.component.html',
  styleUrls: ['./presence-show.component.scss']
})
export class PresenceShowComponent implements OnInit {

  
  id:number;
  presence:any;
personnels:any;
lignes:any;
  constructor(private service:PresenceService,
    private service1:PersonnelService,
    private router: Router,private route: ActivatedRoute) {
      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
      });
    this.getPresence()
     }

  ngOnInit() {
    
}
async getPresence(){
  await this.service.getRessourceById(this.id,"/presences/show/")      
  .subscribe(data => {         
    this.presence = data[0];
    this.personnels = []
    let lignes = []
    this.presence.lignesPresence.forEach(ligne => {
      lignes.push(ligne)
       this.service1.getRessourceById(ligne.idPersonnel,'/personnels/find/')
       .then( p =>{ 
        
         this.personnels.push(p)
        
       })
      
  }, error => console.log(error));
  
 
})
}
mergeArray(A1,A2,f1,f2){
  let result = A1.map((a)=>{
    let obj2 = A2.find((b)=> a.f1 === b.f2);
    if(obj2)
     Object.assign(a,obj2);
    return a;
   });
   return result

}

public delete(id: number) {
  this.service.deleteRessource(id,'/presences/delete/')
    .subscribe(
      data => {
        console.log(data),
        this.router.navigate(['presence/presence-index']) 
        
      },
      error => console.log(error));
}


update(){
  this.router.navigate(['/presence/presence-edit'], { queryParams: { id: this.id } })
}
}
