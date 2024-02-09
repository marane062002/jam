import { Component, OnInit } from '@angular/core';
import { NotationService } from '../../services/notation.service';
import { PersonnelService } from '../../services/personnel.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-notation-show',
  templateUrl: './notation-show.component.html',
  styleUrls: ['./notation-show.component.scss']
})
export class NotationShowComponent implements OnInit {

  
  id:number;
  notation:any;
  personnel:any;
  constructor(private service:NotationService,
    private service1:PersonnelService,
    private router: Router,private route: ActivatedRoute) {

      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
      });
     }

  ngOnInit() {
   
    
   

    this.service.getRessourceById(this.id,"/notations/show/")
      .subscribe(data => {
        
        this.notation = data;
           this.service1.getRessourceById(data.idPersonnel,"/personnels/show/")
                .then(resp => {       
                       this.personnel = resp;
                      
                        }, error => console.log(error));
      }, error => console.log(error));
    

  }
  public delete(id: number) {
    this.service.deleteRessource(id,'/notations/delete/')
      .subscribe(
        data => {
          console.log(data),
          this.router.navigate(['notation/notation-index']) 
          
        },
        error => console.log(error));
  }

 
  update(){
    this.router.navigate(['/notation/notation-edit'], { queryParams: { id: this.id } })
  }
}
