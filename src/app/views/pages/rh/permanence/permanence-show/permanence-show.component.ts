import { Component, OnInit } from '@angular/core';
import { PermanenceService } from '../../services/permanence.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonnelService } from '../../services/personnel.service';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'kt-permanence-show',
  templateUrl: './permanence-show.component.html',
  styleUrls: ['./permanence-show.component.scss']
})
export class PermanenceShowComponent implements OnInit {

  id:number;
  permanence:any;
  personnel:any;
  constructor(private service:PermanenceService,
    private service1:PersonnelService,
    private router: Router,private route: ActivatedRoute) { 
      
      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
      });
    }

  ngOnInit() {
    this.service.getRessourceById(this.id,"/permanences/show/")      
      .subscribe(data => {        
        this.permanence = data;
        
           this.service1.getRessourceById(data.idPersonnel,"/personnels/show/")
                .then(resp => {       
                       this.personnel = resp;
                       
                      
                       
                        }, error => console.log(error));
      }, error => console.log(error));
      
     
  }

  public delete(id: number) {
    this.service.deleteRessource(id,'/permanences/delete/')
      .subscribe(
        data => {
          console.log(data),
          this.router.navigate(['permanence/permanence-index']) 
          
        },
        error => console.log(error));
  }

 
  update(){
    this.router.navigate(['/permanence/permanence-edit'], { queryParams: { id: this.id } })
  }

}
